import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import SurpriseBoxCard from '../../components/restaurant/SurpriseBoxCard';
import ReviewItem from '../../components/restaurant/ReviewItem';
import { useCartStore } from '../../store/useCartStore';
import { useReviewStore } from '../../store/useReviewStore';
import { SurpriseBox } from '../../types';
import { restaurantImageMap as imageMap } from '../../utils/imageMap';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantDetail'>;

type Tab = 'boxes' | 'reviews';

export default function RestaurantDetailScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { restaurant } = route.params;
  const { addItem } = useCartStore();
  const { reviews, fetchReviewsByRestaurant } = useReviewStore();
  const [activeTab, setActiveTab] = useState<Tab>('boxes');

  const [boxes, setBoxes] = useState<SurpriseBox[]>([]);
  const [isLoadingBoxes, setIsLoadingBoxes] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchBoxes = async () => {
        try {
          const api = (await import('../../services/api')).default;
          const response = await api.get(`/Restaurants/${restaurant.id}/boxes`);
          const mappedBoxes = response.data.map((b: any) => ({
            id: b.id,
            name: b.name,
            description: b.description,
            originalPrice: b.originalPrice,
            discountedPrice: b.discountedPrice,
            stock: b.stock,
            image: imageMap[b.imageUrl as keyof typeof imageMap] || imageMap['sweet.png']
          }));
          setBoxes(mappedBoxes);
        } catch (error) {
          console.error('Failed to fetch boxes', error);
        } finally {
          setIsLoadingBoxes(false);
        }
      };

      fetchBoxes();
      fetchReviewsByRestaurant(restaurant.id);
    }, [restaurant.id])
  );

  const handleAddToCart = (boxId: string) => {
    const box = boxes.find(b => b.id === boxId)!;
    addItem(box, restaurant, false);
    Alert.alert(t('cart.addedTitle'), t('cart.addedDesc', { name: box.name }), [
      { text: t('common.done') },
    ]);
  };

  const handleSuspend = (boxId: string) => {
    const box = boxes.find(b => b.id === boxId)!;
    addItem(box, restaurant, true);
    Alert.alert(t('cart.suspendedTitle'), t('cart.suspendedDesc', { name: box.name }), [
      { text: t('common.great') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <FlatList
        data={activeTab === 'boxes' ? boxes : reviews}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            {/* Cover Image */}
            <View style={styles.coverWrap}>
              <Image source={restaurant.image} style={styles.cover} resizeMode="cover" />
              {/* Gradient overlay */}
              <View style={styles.coverGradient} />

              {/* Back Button */}
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
            </View>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.titleRow}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <View style={[
                  styles.statusPill,
                  !restaurant.isOpen && styles.statusPillClosed,
                ]}>
                  <Text style={styles.statusText}>
                    {restaurant.isOpen ? t('home.openNow') : t('home.closed')}
                  </Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>⭐</Text>
                  <Text style={styles.statVal}>{restaurant.rating}</Text>
                  <Text style={styles.statLabel}>({restaurant.reviewCount} {t('home.reviews')})</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>📍</Text>
                  <Text style={styles.statVal}>{restaurant.distance}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>🕐</Text>
                  <Text style={styles.statVal}>{restaurant.deliveryTime}</Text>
                </View>
              </View>

              <Text style={styles.address}>📌 {restaurant.address}</Text>

              {/* Suspended banner */}
              {restaurant.suspendedCount > 0 && (
                <View style={styles.suspendedBanner}>
                  <Text style={styles.suspendedBannerEmoji}>🤝</Text>
                  <Text style={styles.suspendedBannerText}>
                    {t('restaurant.suspendedBanner', { count: restaurant.suspendedCount })}
                  </Text>
                </View>
              )}
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'boxes' && styles.tabActive]}
                onPress={() => setActiveTab('boxes')}
              >
                <Text style={[styles.tabText, activeTab === 'boxes' && styles.tabTextActive]}>
                  🎁 {t('restaurant.surpriseBoxes')} ({boxes.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
                onPress={() => setActiveTab('reviews')}
              >
                <Text style={[styles.tabText, activeTab === 'reviews' && styles.tabTextActive]}>
                  💬 {t('restaurant.reviews')} ({reviews.length})
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) =>
          activeTab === 'boxes' ? (
            <View style={styles.itemWrap}>
              <SurpriseBoxCard
                box={item as any}
                onAddToCart={() => handleAddToCart((item as any).id)}
                onSuspend={() => handleSuspend((item as any).id)}
              />
            </View>
          ) : (
            <View style={styles.itemWrap}>
              <ReviewItem review={item as any} />
            </View>
          )
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{activeTab === 'boxes' ? '📦' : '💬'}</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'boxes' ? t('restaurant.noBoxes') : t('restaurant.noReviews')}
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { paddingBottom: 80 },

  coverWrap: { position: 'relative', height: 260 },
  cover: { width: '100%', height: '100%' },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.background,
    opacity: 0.7,
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 20, color: Colors.white },

  infoCard: {
    marginTop: -20,
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  restaurantName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    flex: 1,
  },
  statusPill: {
    backgroundColor: Colors.success + '22',
    borderWidth: 1,
    borderColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusPillClosed: {
    backgroundColor: Colors.textMuted + '22',
    borderColor: Colors.textMuted,
  },
  statusText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.success },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  statIcon: { fontSize: 14 },
  statVal: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  statDivider: { width: 1, height: 20, backgroundColor: Colors.surfaceBorder, marginHorizontal: 4 },

  address: { fontSize: FontSize.xs, color: Colors.textSecondary, marginBottom: Spacing.sm },

  suspendedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal + '18',
    borderWidth: 1,
    borderColor: Colors.teal + '44',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    gap: 8,
  },
  suspendedBannerEmoji: { fontSize: 20 },
  suspendedBannerText: { fontSize: FontSize.xs, color: Colors.teal, flex: 1, fontWeight: FontWeight.medium },

  tabs: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 4,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white, fontWeight: FontWeight.semibold },

  itemWrap: { paddingHorizontal: Spacing.md },

  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary },
});
