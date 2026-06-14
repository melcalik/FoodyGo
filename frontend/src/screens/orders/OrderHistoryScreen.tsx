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
import { OrderHistoryScreenStyles as styles } from '../../styles/screenStyles';

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
          Alert.alert('Ürün Bulunamadı', `${item.boxName} artık bulunmuyor.`);
          return;
        }
        if (boxData.stock < item.quantity) {
          Alert.alert('Yetersiz Stok', `${item.boxName} için yeterli stok yok.`);
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
      Alert.alert('İşlem Başarısız', 'Sipariş tekrarlanamadı.');
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
            {item.items.map(i => `${i.quantity} x ${i.boxName}`).join(', ')}
          </Text>
          {item.type === 'claimedSuspended' ? (
             <View style={[styles.statusBadge, { backgroundColor: Colors.teal }]}>
                <Text style={[styles.statusSuccessText, { color: Colors.white }]}>Askıdan Alındı</Text>
             </View>
          ) : (
             <Text style={styles.totalPrice}>₺{item.totalAmount}</Text>
          )}
        </View>

        {isCompleted && (
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.btnSecondary, item.isReviewed && styles.btnSecondaryDisabled]}
              onPress={() => navigation.navigate('Review', { order: item })}
              disabled={item.isReviewed}
            >
              <Text style={[styles.btnSecondaryText, item.isReviewed && styles.btnSecondaryTextDisabled]}>
                {item.isReviewed ? t('order.rated') ?? 'Değerlendirildi' : t('order.rate')}
              </Text>
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

