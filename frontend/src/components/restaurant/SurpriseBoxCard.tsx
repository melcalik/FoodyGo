import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SurpriseBox } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';

interface SurpriseBoxCardProps {
  box: SurpriseBox;
  onAddToCart: () => void;
  onSuspend: () => void;
}

export default function SurpriseBoxCard({ box, onAddToCart, onSuspend }: SurpriseBoxCardProps) {
  const { t } = useTranslation();
  const discountPct = Math.round(
    ((box.originalPrice - box.discountedPrice) / box.originalPrice) * 100,
  );
  const isOutOfStock = box.stock === 0;

  return (
    <View style={[styles.card, isOutOfStock && styles.cardDisabled]}>
      
      <View style={styles.header}>
        <View style={styles.emojiWrap}>
          <Ionicons name="gift" size={28} color={Colors.primary} />
        </View>
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
            {isOutOfStock
              ? t('restaurant.outOfStock')
              : `${box.stock} ${t('restaurant.stock')}`}
          </Text>
        </View>

        <View style={styles.actionsCol}>
          <TouchableOpacity
            style={[styles.addBtn, isOutOfStock && styles.addBtnDisabled]}
            onPress={onAddToCart}
            disabled={isOutOfStock}
            activeOpacity={0.85}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {!isOutOfStock && <Ionicons name="add" size={16} color={Colors.white} />}
              <Text style={styles.addBtnText}>
                {isOutOfStock ? '—' : t('restaurant.addToCart')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.suspendBtn, isOutOfStock && styles.addBtnDisabled]}
            onPress={onSuspend}
            disabled={isOutOfStock}
            activeOpacity={0.85}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="heart-circle" size={16} color={Colors.teal} />
              <Text style={styles.suspendBtnText}>{t('restaurant.suspendMeal')}</Text>
            </View>
          </TouchableOpacity>
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
  cardDisabled: { opacity: 0.5 },

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
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: 'center',
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
    paddingVertical: 8,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  suspendBtnText: {
    color: Colors.teal,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
});
