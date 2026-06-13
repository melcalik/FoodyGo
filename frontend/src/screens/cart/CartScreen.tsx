import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useCartStore } from '../../store/useCartStore';
import CartItemRow from '../../components/cart/CartItemRow';
import { CartScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<CartStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { items, totalAmount, clearCart } = useCartStore();
  const total = totalAmount();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('cart.title')}</Text>
        </View>
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={64} color={Colors.textMuted} style={{ marginBottom: 16 }} />
          <Text style={styles.emptyTitle}>{t('cart.empty')}</Text>
          <Text style={styles.emptyText}>{t('cart.emptyDesc')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('cart.title')}</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>{t('cart.clear')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={i => `${i.box.id}-${i.isSuspended}`}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footer}>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t('cart.subtotal')}</Text>
                <Text style={styles.summaryValue}>₺{total}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t('cart.delivery')}</Text>
                <Text style={[styles.summaryValue, { color: Colors.success }]}>{t('cart.free')}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>{t('cart.total')}</Text>
                <Text style={styles.totalValue}>₺{total}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Payment')}
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutText}>{t('cart.checkout')}</Text>
              <Text style={styles.checkoutAmount}>₺{total}</Text>
            </TouchableOpacity>

            <View style={styles.savingBanner}>
              <Ionicons name="leaf" size={20} color={Colors.teal} />
              <Text style={styles.savingText}>
                {t('cart.savingInfo', { co2: (items.length * 2.5).toFixed(1) })}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

