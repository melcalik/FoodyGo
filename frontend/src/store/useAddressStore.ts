import { create } from 'zustand';
import api from '../services/api';

export interface Address {
  id: string;
  title: string;
  city: string;
  district: string;
  addressDetail: string;
  isActive: boolean;
}

interface CreateAddressParams {
  title: string;
  city: string;
  district: string;
  addressDetail: string;
}

interface AddressState {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  fetchAddresses: () => Promise<void>;
  addAddress: (data: CreateAddressParams) => Promise<boolean>;
  setActiveAddress: (id: string) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  isLoading: false,
  error: null,

  fetchAddresses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/addresses');
      set({ addresses: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data || 'Failed to fetch addresses', isLoading: false });
    }
  },

  addAddress: async (data: CreateAddressParams) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/addresses', data);
      await get().fetchAddresses();
      return true;
    } catch (error: any) {
      set({ error: error.response?.data || 'Failed to add address', isLoading: false });
      return false;
    }
  },

  setActiveAddress: async (id: string) => {
    try {
      await api.put(`/addresses/${id}/active`);
      await get().fetchAddresses();
      return true;
    } catch (error: any) {
      return false;
    }
  },

  deleteAddress: async (id: string) => {
    try {
      await api.delete(`/addresses/${id}`);
      await get().fetchAddresses();
      return true;
    } catch (error: any) {
      return false;
    }
  }
}));
