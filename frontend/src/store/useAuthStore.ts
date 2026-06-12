import { create } from 'zustand';
import { User } from '../types';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserStats {
  totalRescuedMeals: number;
  totalSuspendedMeals: number;
  totalCO2SavedKg: number;
  totalMoneySaved: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  userStats: UserStats | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
}

/** Maps the raw API user object to the frontend User type. */
const mapApiUser = (user: any): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
  userStats: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/Auth/login', { email, password });
      const { token, user } = response.data;
      const mappedUser = mapApiUser(user);

      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('auth_user', JSON.stringify(mappedUser)),
      ]);

      set({ isAuthenticated: true, user: mappedUser, token, isLoading: false });
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message ?? 'Login failed.';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/Auth/register', { name, email, password });
      const { token, user } = response.data;
      const mappedUser = mapApiUser(user);

      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('auth_user', JSON.stringify(mappedUser)),
      ]);

      set({ isAuthenticated: true, user: mappedUser, token, isLoading: false });
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message ?? 'Registration failed.';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    await Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('auth_user')
    ]);
    set({ isAuthenticated: false, user: null, token: null });
  },

  hydrate: async () => {
    try {
      const [token, userJson] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('auth_user'),
      ]);
      if (token && userJson) {
        set({ isAuthenticated: true, token, user: JSON.parse(userJson) });
      }
    } catch (error) {
      console.error('Failed to hydrate auth state:', error);
    }
  },

  fetchUserStats: async () => {
    try {
      const response = await api.get('/Users/stats');
      set({ userStats: response.data });
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  },
}));
