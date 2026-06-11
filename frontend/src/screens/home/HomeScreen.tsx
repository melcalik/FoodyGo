/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { RestaurantCategory } from '../../types';
import SearchBar from '../../components/home/SearchBar';
import CategoryFilter from '../../components/home/CategoryFilter';
import RestaurantCard from '../../components/home/RestaurantCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useRestaurantStore } from '../../store/useRestaurantStore';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { restaurants, fetchRestaurants } = useRestaurantStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RestaurantCategory | 'all'>('all');

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const matchCat = category === 'all' || r.category === category;
      const matchSearch =
        search.length === 0 ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category, restaurants]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <FlatList
        data={filtered}
        keyExtractor={r => r.id}
        ListHeaderComponent={
          <>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <View>
                <Text style={styles.greeting}>
                  {t('home.greeting', { name: user?.name.split(' ')[0] })}
                </Text>
                <View style={styles.locationRow}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.location}>{t('home.locationLabel')}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.notifBtn}
                onPress={() => Alert.alert(t('common.comingSoon'), t('common.comingSoonMsg'))}
              >
                <Text style={styles.notifIcon}>🔔</Text>
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
              <SearchBar value={search} onChangeText={setSearch} />
            </View>

            {/* Impact Banner */}
            <View style={styles.impactBanner}>
              <Text style={styles.impactEmoji}>🌍</Text>
              <View style={styles.impactText}>
                <Text style={styles.impactTitle}>
                  {t('home.impactTitle', { count: restaurants.length * 3 })}
                </Text>
                <Text style={styles.impactSub}>{t('home.impactSubtitle')}</Text>
              </View>
            </View>

            {/* Category Filter */}
            <CategoryFilter selected={category} onSelect={setCategory} />

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.title')}</Text>
              <Text style={styles.sectionCount}>
                {t('home.restaurantCount', { count: filtered.length })}
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>{t('home.noResults')}</Text>
            <Text style={styles.emptyText}>{t('home.noResultsDesc')}</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { paddingBottom: 80 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationIcon: { fontSize: 12 },
  location: { fontSize: FontSize.sm, color: Colors.textSecondary },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: { fontSize: 20 },

  searchRow: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  impactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal + '18',
    borderWidth: 1,
    borderColor: Colors.teal + '33',
    borderRadius: 12,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    gap: 12,
  },
  impactEmoji: { fontSize: 32 },
  impactText: { flex: 1 },
  impactTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.teal,
  },
  impactSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  sectionCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: Spacing.xl,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
