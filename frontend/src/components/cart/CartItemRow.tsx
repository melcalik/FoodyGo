import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useCartStore } from '../../store/useCartStore';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { t } = useTranslation();
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <View style={styles.row}>
      {/* Emoji thumbnail */}
      <View style={styles.thumb}>
        <Text style={styles.thumbEmoji}>{item.box.emoji}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.boxName} numberOfLines={1}>{item.box.name}</Text>
          {item.isSuspended && (
            <View style={styles.suspendedTag}>
              <Text style={styles.suspendedTagText}>🤝 {t('cart.suspended')}</Text>
            </View>
          )}
        </View>
        <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
        <Text style={styles.price}>₺{item.box.discountedPrice * item.quantity}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQuantity(item.box.id, item.quantity - 1)}
        >
          <Text style={styles.qtyBtnText}>{item.quantity === 1 ? '🗑' : '−'}</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{item.quantity}</Text>

        <TouchableOpacity
          style={[styles.qtyBtn, styles.qtyBtnAdd]}
          onPress={() => updateQuantity(item.box.id, item.quantity + 1)}
        >
          <Text style={[styles.qtyBtnText, { color: Colors.white }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: Spacing.sm,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 28 },

  info: { flex: 1, gap: 3 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  boxName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    flex: 1,
  },
  suspendedTag: {
    backgroundColor: Colors.teal + '22',
    borderWidth: 1,
    borderColor: Colors.teal + '55',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  suspendedTagText: { fontSize: 9, color: Colors.teal, fontWeight: FontWeight.semibold },
  restaurantName: { fontSize: FontSize.xs, color: Colors.textMuted },
  price: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },

  controls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnAdd: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  qtyBtnText: { fontSize: 15, color: Colors.textPrimary },
  qty: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
});
