import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SuspendedStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useOrderStore } from '../../store/useOrderStore';
import { useSuspendedStore } from '../../store/useSuspendedStore';
import { useCartStore } from '../../store/useCartStore';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SuspendedMealScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<SuspendedStackParamList, 'SuspendedMeal'>;

export default function SuspendedMealScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { orders, fetchOrders } = useOrderStore();
  const { availableMeals, isLoading, fetchAvailableMeals, claimMeal } = useSuspendedStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchAvailableMeals();
      fetchOrders();
    }, [fetchAvailableMeals, fetchOrders])
  );

  const myDonationsCount = useMemo(() => {
    return orders.reduce((count, order) => {
      return count + order.items.filter(i => i.isSuspended).reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  }, [orders]);

  const { addItem, getClaimedQuantity, items, updateQuantity } = useCartStore();

  const groupedMeals = useMemo(() => {
    const map = new Map<string, typeof availableMeals[0] & { count: number }>();
    availableMeals.forEach(m => {
      if (map.has(m.boxId)) {
        map.get(m.boxId)!.count++;
      } else {
        map.set(m.boxId, { ...m, count: 1 });
      }
    });
    return Array.from(map.values());
  }, [availableMeals]);

  const handleClaim = (meal: any) => {
    const fakeBox = {
      id: meal.boxId,
      restaurantId: meal.restaurantId,
      name: meal.boxName,
      description: 'Askıdan alınan yemek',
      originalPrice: 0,
      discountedPrice: 0,
      stock: 1,
      createdAt: meal.createdAt.toISOString(),
      image: meal.restaurantImageUrl
    };
    
    const fakeRestaurant = {
      id: meal.restaurantId,
      name: meal.restaurantName,
      imageUrl: meal.restaurantImageUrl,
      rating: 0,
      reviewCount: 0,
      distance: '',
      deliveryTime: '',
      category: 'homemade' as any,
      address: '',
      isOpen: true,
      suspendedCount: 0
    };

    addItem(fakeBox as any, fakeRestaurant as any, false, meal.id);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.hero}>
          <Ionicons name="heart-circle" size={60} color={Colors.white} style={{ marginBottom: Spacing.md }} />
          <Text style={styles.heroTitle}>{t('suspended.title')}</Text>
          <Text style={styles.heroSubtitle}>
            {t('suspended.heroSubtitle')}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{t('suspended.myDonations')}</Text>
            <Text style={styles.statValue}>{myDonationsCount}</Text>
            <Ionicons name="heart" size={50} color={Colors.primary} style={styles.statEmoji} />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{t('suspended.totalCount')}</Text>
            <Text style={styles.statValue}>{availableMeals.length}</Text>
            <Ionicons name="earth" size={50} color={Colors.primary} style={styles.statEmoji} />
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>{t('suspended.waitingToClaim')}</Text>
          
          {isLoading && availableMeals.length === 0 ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
          ) : availableMeals.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="leaf" size={40} color={Colors.textMuted} style={{ marginBottom: 8 }} />
              <Text style={styles.emptyText}>{t('suspended.emptyList')}</Text>
            </View>
          ) : (
            groupedMeals.map(meal => {
              const inCart = getClaimedQuantity(meal.boxId);
              const isOutOfStock = inCart >= meal.count;

              return (
                <View key={meal.id} style={styles.mealCard}>
                  <Image source={meal.restaurantImageUrl as any} style={styles.restaurantImage} />
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealBoxName}>{meal.boxName}</Text>
                    <Text style={{ color: Colors.primary, fontWeight: FontWeight.medium, fontSize: FontSize.sm, marginBottom: 4 }}>{meal.count} Adet</Text>
                    <Text style={styles.mealRestaurantName}>{meal.restaurantName}</Text>
                    <Text style={styles.mealDonor}>{t('suspended.donor')}{meal.donorName} {meal.count > 1 ? 've diğerleri' : ''}</Text>
                  </View>
                  {inCart > 0 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: Spacing.sm, height: 36, width: 115 }}>
                      <TouchableOpacity
                        style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.surfaceBorder, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => updateQuantity(meal.boxId, inCart - 1, false, meal.id)}
                      >
                        {inCart === 1 ? (
                          <Ionicons name="trash-outline" size={16} color={Colors.textPrimary} />
                        ) : (
                          <Text style={{ fontSize: 15, color: Colors.textPrimary }}>−</Text>
                        )}
                      </TouchableOpacity>

                      <Text style={{ fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, minWidth: 20, textAlign: 'center' }}>{inCart}</Text>

                      <TouchableOpacity
                        style={[{ width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.surfaceBorder, alignItems: 'center', justifyContent: 'center' }, isOutOfStock ? { opacity: 0.5 } : { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
                        onPress={() => !isOutOfStock && handleClaim(meal)}
                        disabled={isOutOfStock}
                      >
                        <Text style={[{ fontSize: 15, color: Colors.textPrimary }, !isOutOfStock && { color: Colors.white }]}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.claimBtn, isOutOfStock && { backgroundColor: Colors.textMuted }]}
                      onPress={() => !isOutOfStock && handleClaim(meal)}
                      disabled={isOutOfStock}
                    >
                      <Text style={styles.claimBtnText}>{isOutOfStock ? 'Tükendi' : t('suspended.claimBtn')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

