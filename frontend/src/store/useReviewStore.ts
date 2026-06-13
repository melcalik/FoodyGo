import { create } from 'zustand';
import { Review } from '../types';
import api from '../services/api';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;

  fetchReviewsByRestaurant: (restaurantId: string) => Promise<void>;
  submitReview: (restaurantId: string, orderId: string, rating: number, comment: string) => Promise<void>;
}

const mapApiReview = (r: any): Review => ({
  id: r.id,
  restaurantId: r.restaurantId,
  userId: r.userId,
  userName: r.userName,
  userAvatar: r.userAvatar ?? '',
  orderId: r.orderId ?? '',
  rating: r.rating,
  comment: r.comment,
  createdAt: new Date(r.createdAt),
});

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  isLoading: false,
  error: null,

  fetchReviewsByRestaurant: async (restaurantId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/Reviews/restaurant/${restaurantId}`);
      set({ reviews: response.data.map(mapApiReview), isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch reviews:', error);
      set({ error: error.message, isLoading: false, reviews: [] });
    }
  },

  submitReview: async (restaurantId, orderId, rating, comment) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/Reviews', { restaurantId, orderId, rating, comment });
      const newReview = mapApiReview(response.data);
      set(state => ({ reviews: [newReview, ...state.reviews], isLoading: false }));
    } catch (error: any) {
      console.error('Failed to submit review:', error.response?.data || error);
      set({ error: error.response?.data?.message ?? error.message, isLoading: false });
      throw error;
    }
  },
}));
