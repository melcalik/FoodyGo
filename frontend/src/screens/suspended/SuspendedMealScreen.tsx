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
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<SuspendedStackParamList, 'SuspendedMeal'>;

export default function SuspendedMealScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { orders } = useOrderStore();
  const { availableMeals, isLoading, fetchAvailableMeals, claimMeal } = useSuspendedStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchAvailableMeals();
    }, [])
  );

  const myDonationsCount = useMemo(() => {
    return orders.reduce((count, order) => {
      return count + order.items.filter(i => i.isSuspended).reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  }, [orders]);

  const handleClaim = async (id: string) => {
    try {
      await claimMeal(id);
      Alert.alert(t('suspended.claimSuccessTitle'), t('suspended.claimSuccessDesc'));
    } catch (e: any) {
      Alert.alert(t('common.error'), e.message || t('suspended.claimError'));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.teal} />
      
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
            <Ionicons name="heart" size={50} color={Colors.teal} style={styles.statEmoji} />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{t('suspended.totalCount')}</Text>
            <Text style={styles.statValue}>{availableMeals.length}</Text>
            <Ionicons name="earth" size={50} color={Colors.teal} style={styles.statEmoji} />
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>{t('suspended.waitingToClaim')}</Text>
          
          {isLoading && availableMeals.length === 0 ? (
            <ActivityIndicator size="large" color={Colors.teal} style={{ marginTop: 20 }} />
          ) : availableMeals.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="leaf" size={40} color={Colors.textMuted} style={{ marginBottom: 8 }} />
              <Text style={styles.emptyText}>{t('suspended.emptyList')}</Text>
            </View>
          ) : (
            availableMeals.map(meal => (
              <View key={meal.id} style={styles.mealCard}>
                <Image source={{ uri: meal.restaurantImageUrl }} style={styles.restaurantImage} />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealBoxName}>{meal.boxName}</Text>
                  <Text style={styles.mealRestaurantName}>{meal.restaurantName}</Text>
                  <Text style={styles.mealDonor}>{t('suspended.donor')}{meal.donorName}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.claimBtn}
                  onPress={() => handleClaim(meal.id)}
                >
                  <Text style={styles.claimBtnText}>{t('suspended.claimBtn')}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },

  hero: {
    backgroundColor: Colors.teal,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginTop: -30,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    position: 'relative',
    overflow: 'hidden',
  },
  statLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4, zIndex: 2 },
  statValue: { fontSize: 32, fontWeight: FontWeight.extrabold, color: Colors.teal, zIndex: 2 },
  statEmoji: { position: 'absolute', right: -10, bottom: -10, opacity: 0.1, zIndex: 1 },

  listSection: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  emptyText: { fontSize: FontSize.sm, color: Colors.textSecondary },

  mealCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mealBoxName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  mealRestaurantName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  mealDonor: {
    fontSize: 10,
    color: Colors.teal,
    fontWeight: FontWeight.medium,
  },
  claimBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.md,
    marginLeft: Spacing.sm,
  },
  claimBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSize.sm,
  },
});
