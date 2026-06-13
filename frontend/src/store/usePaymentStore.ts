import { create } from 'zustand';
import { PaymentMethod } from '../types';
import api from '../services/api';

interface PaymentState {
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  error: string | null;

  fetchPaymentMethods: () => Promise<void>;
  addPaymentMethod: (data: Omit<PaymentMethod, 'id' | 'isLastUsed'>) => Promise<boolean>;
  deletePaymentMethod: (id: string) => Promise<boolean>;
  setLastUsed: (id: string) => Promise<void>;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  paymentMethods: [],
  isLoading: false,
  error: null,

  fetchPaymentMethods: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/PaymentMethods');
      set({ paymentMethods: response.data, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch payment methods:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  addPaymentMethod: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/PaymentMethods', data);
      set((state) => {

        const updatedMethods = state.paymentMethods.map(m => ({ ...m, isLastUsed: false }));
        return {
          paymentMethods: [response.data, ...updatedMethods],
          isLoading: false
        };
      });
      return true;
    } catch (error: any) {
      console.error('Failed to add payment method:', error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  deletePaymentMethod: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/PaymentMethods/${id}`);
      set((state) => ({
        paymentMethods: state.paymentMethods.filter((m) => m.id !== id),
        isLoading: false,
      }));
      return true;
    } catch (error: any) {
      console.error('Failed to delete payment method:', error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  setLastUsed: async (id) => {
    try {
      await api.put(`/PaymentMethods/${id}/set-last-used`);
      set((state) => ({
        paymentMethods: state.paymentMethods.map((m) => ({
          ...m,
          isLastUsed: m.id === id,
        })),
      }));
    } catch (error) {
      console.error('Failed to set last used payment method:', error);
    }
  },
}));
