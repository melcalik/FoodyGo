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
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import SurpriseBoxCard from '../../components/restaurant/SurpriseBoxCard';
import ReviewItem from '../../components/restaurant/ReviewItem';
import { useCartStore } from '../../store/useCartStore';
import { SurpriseBox } from '../../types';
import { restaurantImageMap as imageMap } from '../../utils/imageMap';
import { RestaurantDetailScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantDetail'>;

type Tab = 'boxes' | 'reviews';

export default function RestaurantDetailScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { restaurant } = route.params;
  const { addItem } = useCartStore();

  const [boxes, setBoxes] = useState<SurpriseBox[]>([]);
  const [isLoadingBoxes, setIsLoadingBoxes] = useState(true);
  const [alertConfig, setAlertConfig] = useState<{ visible: boolean; title: string; desc: string; icon: string; color: string } | null>(null);

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
    }, [restaurant.id])
  );

  const handleAddToCart = (boxId: string) => {
    const box = boxes.find(b => b.id === boxId)!;
    addItem(box, restaurant, false);
  };

  const handleSuspend = (boxId: string) => {
    const box = boxes.find(b => b.id === boxId)!;
    addItem(box, restaurant, true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <FlatList
        data={boxes}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.coverWrap}>
              <Image source={restaurant.image} style={styles.cover} resizeMode="cover" />
              
              <View style={styles.coverGradient} />

              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>

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
                <TouchableOpacity 
                  style={styles.statItem} 
                  onPress={() => navigation.navigate('RestaurantReviews', { restaurant })}
                  activeOpacity={0.7}
                >
                  <Ionicons name="star" size={14} color="#FBBF24" />
                  {restaurant.reviewCount === 0 ? (
                    <Text style={styles.statLabel}>({t('restaurant.noReviews', { defaultValue: 'Henüz yorum yok' })})</Text>
                  ) : (
                    <>
                      <Text style={styles.statVal}>{restaurant.rating}</Text>
                      <Text style={styles.statLabel}>({restaurant.reviewCount} {t('home.reviews')})</Text>
                    </>
                  )}
                </TouchableOpacity>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Ionicons name="location" size={14} color={Colors.textSecondary} />
                  <Text style={styles.statVal}>{restaurant.distance}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.statVal}>{restaurant.deliveryTime}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: Spacing.sm }}>
                <Ionicons name="map-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.address}>{restaurant.address}</Text>
              </View>

              {restaurant.suspendedCount > 0 && (
                <View style={styles.suspendedBanner}>
                  <Ionicons name="heart-circle" size={20} color={Colors.teal} />
                  <Text style={styles.suspendedBannerText}>
                    {t('restaurant.suspendedBanner', { count: restaurant.suspendedCount })}
                  </Text>
                </View>
              )}
            </View>
          </>
        }
        renderItem={({ item }) =>
            <View style={styles.itemWrap}>
              <SurpriseBoxCard
                box={item as any}
                onAddToCart={() => handleAddToCart((item as any).id)}
                onSuspend={() => handleSuspend((item as any).id)}
              />
            </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons 
              name={'cube-outline'} 
              size={48} 
              color={Colors.textMuted} 
              style={{ marginBottom: 12 }} 
            />
            <Text style={styles.emptyText}>
              {t('restaurant.noBoxes')}
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={alertConfig?.visible ?? false}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertConfig(null)}
      >
        <TouchableWithoutFeedback onPress={() => setAlertConfig(null)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback>
              <View style={{ backgroundColor: Colors.surface, padding: Spacing.xl, borderRadius: Radius.lg, alignItems: 'center', width: '80%', shadowColor: Colors.black, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 }}>
                <Ionicons name={alertConfig?.icon || 'alert-circle'} size={64} color={alertConfig?.color} style={{ marginBottom: Spacing.md }} />
                <Text style={{ fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.xs, textAlign: 'center' }}>
                  {alertConfig?.title}
                </Text>
                <Text style={{ fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xl }}>
                  {alertConfig?.desc}
                </Text>
                <TouchableOpacity 
                  style={{ backgroundColor: alertConfig?.color, paddingVertical: 14, paddingHorizontal: 32, borderRadius: Radius.md, width: '100%', alignItems: 'center' }}
                  onPress={() => setAlertConfig(null)}
                >
                  <Text style={{ color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.md }}>{t('common.done', { defaultValue: 'Tamam' })}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

