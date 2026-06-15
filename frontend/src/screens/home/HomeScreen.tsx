
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
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius } from '../../constants/theme';
import { RestaurantCategory } from '../../types';
import SearchBar from '../../components/home/SearchBar';
import CategoryFilter from '../../components/home/CategoryFilter';
import RestaurantCard from '../../components/home/RestaurantCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useRestaurantStore } from '../../store/useRestaurantStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAddressStore } from '../../store/useAddressStore';
import api from '../../services/api';
import { HomeScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { user, userStats, fetchUserStats } = useAuthStore();
  const { restaurants, fetchRestaurants } = useRestaurantStore();
  const { addresses, fetchAddresses } = useAddressStore();
  const { fetchOrders } = useOrderStore();
  const { unreadCount } = useNotificationStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RestaurantCategory | 'all'>('all');
  const [dailyStats, setDailyStats] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses().then(() => fetchRestaurants());
      api.get('/Orders/daily-stats')
        .then(res => setDailyStats(res.data.count))
        .catch(err => console.error('Failed to load daily stats', err));
    }, [fetchRestaurants, fetchAddresses])
  );

  const activeAddress = addresses.find(a => a.isActive);
  const locationLabel = activeAddress ? `${activeAddress.district}, ${activeAddress.city}` : t('home.locationLabel');

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const matchCat = category === 'all' || r.category === category;
      const matchSearch =
        search.length === 0 ||
        r.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category, restaurants]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <FlatList
        data={filtered}
        keyExtractor={r => r.id}
        ListHeaderComponent={
          <>
            
            <View style={styles.topBar}>
              <View>
                <Text style={styles.greeting}>
                  {t('home.greeting', { name: user?.name.split(' ')[0] })}
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color={Colors.textSecondary} />
                  <Text style={styles.location}>{locationLabel}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.notifBtn}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
                {unreadCount > 0 && (
                  <View style={styles.notifBadge}>
                    <Text style={styles.notifBadgeText}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.searchRow}>
              <SearchBar value={search} onChangeText={setSearch} />
            </View>

            <View style={styles.impactBanner}>
              <Ionicons name="earth" size={32} color={Colors.teal} />
              <View style={styles.impactText}>
                <Text style={styles.impactTitle}>
                  {t('home.impactTitle', { count: dailyStats })}
                </Text>
                <Text style={styles.impactSub}>{t('home.impactSubtitle')}</Text>
              </View>
            </View>

            <CategoryFilter selected={category} onSelect={setCategory} />

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
            <Ionicons name="search" size={48} color={Colors.textMuted} style={{ marginBottom: 12 }} />
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

