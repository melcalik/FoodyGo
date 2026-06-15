import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RestaurantReviewsScreenStyles as styles, RestaurantReviewsExtraStyles as extraStyles } from '../../styles/screenStyles';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { useReviewStore } from '../../store/useReviewStore';
import { Review } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantReviews'>;

export default function RestaurantReviewsScreen({ route, navigation }: Props) {
  const { restaurant } = route.params;
  const { t } = useTranslation();
  const { reviews, isLoading, fetchReviewsByRestaurant, error } = useReviewStore();

  useEffect(() => {
    fetchReviewsByRestaurant(restaurant.id);
  }, [restaurant.id]);

  const displayReviews = reviews;

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={14}
            color={star <= rating ? "#FBBF24" : Colors.textMuted}
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{item.userName.charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.date}>{item.createdAt.toLocaleDateString('tr-TR')}</Text>
          </View>
        </View>
        {renderStars(item.rating)}
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
      {item.orderItems && item.orderItems.length > 0 && (
        <Text style={extraStyles.orderItemsText}>
          {Array.from(new Set(item.orderItems)).join(', ')}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('restaurant.reviews', { defaultValue: 'Değerlendirmeler' })}</Text>
      </View>

      {isLoading ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={displayReviews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[styles.content, displayReviews.length === 0 && { flex: 1 }]}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="chatbubbles-outline" size={64} color={Colors.textMuted} />
              <Text style={styles.emptyText}>{t('restaurant.noReviewsDetailed', { defaultValue: 'Henüz bu restorana bir yorum yapılmadı.' })}</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
