/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OrdersStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useFocusEffect } from '@react-navigation/native';
import { useOrderStore } from '../../store/useOrderStore';
import { useCartStore } from '../../store/useCartStore';
import { useRestaurantStore } from '../../store/useRestaurantStore';
import { Order, SurpriseBox } from '../../types';
import api from '../../services/api';
import { restaurantImageMap } from '../../utils/imageMap';

type Props = NativeStackScreenProps<OrdersStackParamList, 'OrderHistory'>;

export default function OrderHistoryScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const { orders, fetchOrders } = useOrderStore();
  const { addItem } = useCartStore();
  const { restaurants } = useRestaurantStore();

  const handleReorder = async (order: Order) => {
    try {
      const response = await api.get(`/Restaurants/${order.restaurantId}/boxes`);
      const boxesData = response.data;
      
      let restaurant = restaurants.find(r => r.id === order.restaurantId);
      if (!restaurant) {
         restaurant = {
           id: order.restaurantId,
           name: order.restaurantName,
           image: order.restaurantImage,
           category: 'sweet',
           rating: 5,
           reviewCount: 0,
           address: '',
           distance: '',
           isOpen: true,
           deliveryTime: '',
           suspendedCount: 0,
         };
      }

      const itemsToAdd: Array<{ box: SurpriseBox; quantity: number; isSuspended: boolean }> = [];

      for (const item of order.items) {
        const boxData = boxesData.find((b: any) => b.id === item.boxId);
        if (!boxData) {
          Alert.alert(t('common.error', { defaultValue: 'Hata' }), `${item.boxName} artık bulunmuyor.`);
          return;
        }
        if (boxData.stock < item.quantity) {
          Alert.alert(t('common.error', { defaultValue: 'Hata' }), `${item.boxName} için yeterli stok yok.`);
          return;
        }

        const mappedBox: SurpriseBox = {
          id: boxData.id,
          restaurantId: order.restaurantId,
          name: boxData.name,
          description: boxData.description,
          originalPrice: boxData.originalPrice,
          discountedPrice: boxData.discountedPrice,
          stock: boxData.stock,
          image: restaurantImageMap[boxData.imageUrl as keyof typeof restaurantImageMap],
        };
        itemsToAdd.push({ box: mappedBox, quantity: item.quantity, isSuspended: item.isSuspended });
      }

      for (const item of itemsToAdd) {
        for (let i = 0; i < item.quantity; i++) {
          addItem(item.box, restaurant, item.isSuspended);
        }
      }

      navigation.navigate('CartTab' as any);
    } catch (err) {
      console.error(err);
      Alert.alert(t('common.error', { defaultValue: 'Hata' }), 'Sipariş tekrarlanamadı.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  const renderOrderItem = ({ item }: { item: Order }) => {
    const isCompleted = item.status === 'pickedUp';
    const dateStr = item.createdAt.toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Image source={item.restaurantImage} style={styles.restaurantImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <View style={[styles.statusBadge, isCompleted ? styles.statusSuccess : styles.statusActive]}>
            <Text style={isCompleted ? styles.statusSuccessText : styles.statusActiveText}>
              {isCompleted ? t('order.completed') : t('order.ongoing')}
            </Text>
          </View>
        </View>

        <View style={styles.itemsWrap}>
          <Text style={styles.itemsSummary} numberOfLines={1}>
            {item.items.map(i => `${i.quantity}x ${i.boxName}`).join(', ')}
          </Text>
          <Text style={styles.totalPrice}>₺{item.totalAmount}</Text>
        </View>

        {isCompleted && (
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.btnSecondary}
              onPress={() => navigation.navigate('Review', { order: item })}
            >
              <Text style={styles.btnSecondaryText}>{t('order.rate')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.btnPrimary}
              onPress={() => handleReorder(item)}
            >
              <Text style={styles.btnPrimaryText}>{t('order.reorder')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('order.title')}</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={o => o.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="restaurant" size={48} color={Colors.textMuted} style={{ marginBottom: 16 }} />
            <Text style={styles.emptyTitle}>{t('order.noOrders')}</Text>
            <Text style={styles.emptyText}>{t('order.noOrdersDesc')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, paddingBottom: 40 },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  restaurantImage: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    marginRight: Spacing.sm,
  },
  headerInfo: { flex: 1 },
  restaurantName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  date: { fontSize: FontSize.xs, color: Colors.textMuted },
  
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusSuccess: { backgroundColor: Colors.success + '11', borderColor: Colors.success + '33' },
  statusSuccessText: { color: Colors.success, fontSize: 10, fontWeight: 'bold' },
  statusActive: { backgroundColor: Colors.primary + '11', borderColor: Colors.primary + '33' },
  statusActiveText: { color: Colors.primary, fontSize: 10, fontWeight: 'bold' },

  itemsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    marginBottom: Spacing.sm,
  },
  itemsSummary: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginRight: Spacing.sm,
  },
  totalPrice: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  btnSecondaryText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Colors.primary + '15',
  },
  btnPrimaryText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
});
