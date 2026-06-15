import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Restaurant } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../../constants/theme';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

export default function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  const { t } = useTranslation();

  const discount = Math.round(((180 - 65) / 180) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.92}>
      
      <View style={styles.imageWrap}>
        <Image source={restaurant.image} style={styles.image} resizeMode="cover" />

        <View style={[styles.statusBadge, !restaurant.isOpen && styles.statusBadgeClosed]}>
          <Text style={styles.statusDot}>{restaurant.isOpen ? '●' : '●'}</Text>
          <Text style={styles.statusText}>
            {restaurant.isOpen ? t('home.openNow') : t('home.closed')}
          </Text>
        </View>

        {restaurant.suspendedCount > 0 && (
          <View style={styles.suspendedBadge}>
            <Ionicons name="heart-circle" size={14} color={Colors.white} />
            <Text style={styles.suspendedText}>{restaurant.suspendedCount}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FBBF24" />
            {restaurant.reviewCount === 0 ? (
              <Text style={styles.reviewCount}>({t('restaurant.noReviews', { defaultValue: 'Henüz yorum yok' })})</Text>
            ) : (
              <>
                <Text style={styles.rating}>{restaurant.rating}</Text>
                <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location" size={12} color={Colors.textSecondary} />
          <Text style={[styles.meta, { marginLeft: -4 }]}>{restaurant.distance}</Text>
          <View style={styles.dot} />
          <Ionicons name="time-outline" size={12} color={Colors.textSecondary} />
          <Text style={[styles.meta, { marginLeft: -4 }]}>{restaurant.deliveryTime}</Text>
        </View>

        <View style={styles.pickupRow}>
          <View style={styles.savingBadge}>
            <Text style={styles.savingText}>%{discount}'e kadar indirim</Text>
          </View>
          <Text style={styles.meta}>{restaurant.address.split(',')[1]?.trim() || ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Shadow.md,
  },
  imageWrap: {
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + 'DD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 4,
  },
  statusBadgeClosed: { backgroundColor: Colors.textMuted + 'DD' },
  statusDot: { fontSize: 8, color: Colors.white },
  statusText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.white },

  suspendedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal + 'DD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
    gap: 4,
  },
  suspendedText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.white },

  info: {
    padding: Spacing.md,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: FontSize.sm, fontWeight: 'bold', color: Colors.textPrimary },
  reviewCount: { fontSize: FontSize.xs, color: Colors.textMuted },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
  },
  meta: { fontSize: FontSize.xs, color: Colors.textSecondary },

  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  savingBadge: {
    backgroundColor: Colors.primary + '22',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '44',
  },
  savingText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
});
