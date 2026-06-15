import { create } from 'zustand';
import { Restaurant } from '../types';
import api from '../services/api';
import { restaurantImageMap } from '../utils/imageMap';

interface RestaurantState {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
  fetchRestaurants: () => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurants: [],
  isLoading: false,
  error: null,

  fetchRestaurants: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/Restaurants');
      const restaurants: Restaurant[] = response.data.map((r: any) => ({
        id: r.id,
        name: r.name,
        category: r.category,
        rating: r.rating,
        reviewCount: r.reviewCount,
        address: r.address,
        distance: r.distance,
        image: restaurantImageMap[r.imageUrl] ?? restaurantImageMap['sweet.png'],
        isOpen: true,
        deliveryTime: r.deliveryTime,
        suspendedCount: r.suspendedCount,
        boxNames: r.boxNames || [],
      }));
      const sortedRestaurants = restaurants.sort((a, b) => {
        const distA = parseFloat(a.distance.replace(',', '.').split(' ')[0]) || 0;
        const distB = parseFloat(b.distance.replace(',', '.').split(' ')[0]) || 0;
        return distA - distB;
      });
      set({ restaurants: sortedRestaurants, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch restaurants:', error.message);
      set({ error: error.message, isLoading: false });
    }
  },
}));
