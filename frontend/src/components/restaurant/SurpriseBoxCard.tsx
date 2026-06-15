import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SurpriseBox } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useCartStore } from '../../store/useCartStore';

interface SurpriseBoxCardProps {
  box: SurpriseBox;
  onAddToCart: () => void;
  onSuspend: () => void;
}

export default function SurpriseBoxCard({ box, onAddToCart, onSuspend }: SurpriseBoxCardProps) {
  const { t } = useTranslation();
  const { getItemQuantity, updateQuantity } = useCartStore();

  const discountPct = Math.round(
    ((box.originalPrice - box.discountedPrice) / box.originalPrice) * 100,
  );

  const inCartNormal = getItemQuantity(box.id, false);
  const inCartSuspended = getItemQuantity(box.id, true);

  const isGlobalOutOfStock = box.stock === 0;
  const isOutOfStockTotal = (inCartNormal + inCartSuspended) >= box.stock;

  return (
    <View style={[styles.card, isGlobalOutOfStock && styles.cardDisabled]}>
      
      <View style={styles.header}>
        {box.image ? (
          <Image source={box.image} style={styles.emojiWrap} />
        ) : (
          <View style={styles.emojiWrap}>
            <Ionicons name="gift" size={28} color={Colors.primary} />
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{box.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{box.description}</Text>
        </View>
        
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>-%{discountPct}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceWrap}>
          <Text style={styles.originalPrice}>₺{box.originalPrice}</Text>
          <Text style={styles.discountedPrice}>₺{box.discountedPrice}</Text>
          <Text style={styles.stock}>
            {isGlobalOutOfStock
              ? t('restaurant.outOfStock')
              : `${box.stock} ${t('restaurant.stock')}`}
          </Text>
        </View>

        <View style={styles.actionsCol}>
          {inCartNormal > 0 ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, width: 135 }}>
              <TouchableOpacity
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.surfaceBorder, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => updateQuantity(box.id, inCartNormal - 1, false)}
              >
                {inCartNormal === 1 ? <Ionicons name="trash-outline" size={18} color={Colors.textPrimary} /> : <Text style={{ fontSize: 18, color: Colors.textPrimary }}>−</Text>}
              </TouchableOpacity>
              <Text style={{ fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, minWidth: 24, textAlign: 'center' }}>{inCartNormal}</Text>
              <TouchableOpacity
                style={[{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }, isOutOfStockTotal && { opacity: 0.5 }]}
                onPress={() => !isOutOfStockTotal && updateQuantity(box.id, inCartNormal + 1, false)}
                disabled={isOutOfStockTotal}
              >
                <Text style={{ fontSize: 18, color: Colors.white }}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.addBtn, isGlobalOutOfStock && styles.addBtnDisabled]}
              onPress={onAddToCart}
              disabled={isGlobalOutOfStock || isOutOfStockTotal}
              activeOpacity={0.85}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {!isGlobalOutOfStock && <Ionicons name="add" size={16} color={Colors.white} />}
                <Text style={styles.addBtnText}>
                  {isGlobalOutOfStock ? '—' : t('restaurant.addToCart')}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {inCartSuspended > 0 ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 36, width: 135 }}>
              <TouchableOpacity
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.teal + '11', borderWidth: 1, borderColor: Colors.teal + '55', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => updateQuantity(box.id, inCartSuspended - 1, true)}
              >
                {inCartSuspended === 1 ? <Ionicons name="trash-outline" size={18} color={Colors.teal} /> : <Text style={{ fontSize: 18, color: Colors.teal }}>−</Text>}
              </TouchableOpacity>
              <Text style={{ fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.teal, minWidth: 24, textAlign: 'center' }}>{inCartSuspended}</Text>
              <TouchableOpacity
                style={[{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' }, isOutOfStockTotal && { opacity: 0.5 }]}
                onPress={() => !isOutOfStockTotal && updateQuantity(box.id, inCartSuspended + 1, true)}
                disabled={isOutOfStockTotal}
              >
                <Text style={{ fontSize: 18, color: Colors.white }}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.suspendBtn, isGlobalOutOfStock && styles.addBtnDisabled]}
              onPress={onSuspend}
              disabled={isGlobalOutOfStock || isOutOfStockTotal}
              activeOpacity={0.85}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="heart-circle" size={16} color={Colors.teal} />
                <Text style={styles.suspendBtnText}>{t('restaurant.suspendMeal')}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  cardDisabled: { opacity: 0.7 },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: { flex: 1 },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  description: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 17,
  },

  discountTag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  discountText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },

  contentsWrap: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: 3,
  },
  contentsLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  contentItem: { flexDirection: 'row', gap: 6 },
  contentDot: { color: Colors.primary, fontSize: FontSize.xs, marginTop: 1 },
  contentText: { fontSize: FontSize.xs, color: Colors.textSecondary, flex: 1 },

  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceWrap: { gap: 2 },
  originalPrice: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.primary,
  },
  stock: {
    fontSize: FontSize.xs,
    color: Colors.warning,
    fontWeight: FontWeight.medium,
  },

  actionsCol: { gap: 8 },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    height: 40,
    width: 135,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  addBtnDisabled: { backgroundColor: Colors.textMuted },
  addBtnText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  suspendBtn: {
    backgroundColor: Colors.teal + '22',
    borderWidth: 1,
    borderColor: Colors.teal,
    paddingHorizontal: Spacing.md,
    height: 36,
    width: 135,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspendBtnText: {
    color: Colors.teal,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
});
