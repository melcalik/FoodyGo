import { create } from 'zustand';
import { SuspendedMeal } from '../types';
import api from '../services/api';

interface SuspendedState {
  availableMeals: SuspendedMeal[];
  isLoading: boolean;
  error: string | null;

  fetchAvailableMeals: () => Promise<void>;
  claimMeal: (id: string) => Promise<void>;
}

export const useSuspendedStore = create<SuspendedState>((set) => ({
  availableMeals: [],
  isLoading: false,
  error: null,

  fetchAvailableMeals: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/SuspendedMeals/available');
      const availableMeals: SuspendedMeal[] = response.data.map((m: any) => ({
        id: m.id,
        restaurantId: m.restaurantId,
        restaurantName: m.restaurantName,
        restaurantImageUrl: m.restaurantImageUrl,
        boxId: m.boxId,
        boxName: m.boxName,
        donorName: m.donorName,
        createdAt: new Date(m.createdAt),
      }));
      set({ availableMeals, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch suspended meals:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  claimMeal: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/SuspendedMeals/${id}/claim`);
      set(state => ({
        availableMeals: state.availableMeals.filter(m => m.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('Failed to claim suspended meal:', error.response?.data || error);
      set({ error: error.response?.data?.message ?? error.message, isLoading: false });
      throw error;
    }
  },
}));
