import { create } from 'zustand';
import { CartItem, SurpriseBox, Restaurant } from '../types';

interface CartState {
  items: CartItem[];

  addItem: (box: SurpriseBox, restaurant: Restaurant, isSuspended?: boolean) => void;
  removeItem: (boxId: string, isSuspended: boolean) => void;
  updateQuantity: (boxId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed
  totalItems: () => number;
  totalAmount: () => number;
  getItemQuantity: (boxId: string) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (box, restaurant, isSuspended = false) => {
    set(state => {
      const existing = state.items.find(
        i => i.box.id === box.id && i.isSuspended === isSuspended,
      );
      if (existing) {
        return {
          items: state.items.map(i =>
            i.box.id === box.id && i.isSuspended === isSuspended
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { box, restaurant, quantity: 1, isSuspended }] };
    });
  },

  // Fix: removeItem now respects isSuspended flag to avoid removing both variants at once
  removeItem: (boxId, isSuspended) => {
    set(state => ({
      items: state.items.filter(
        i => !(i.box.id === boxId && i.isSuspended === isSuspended),
      ),
    }));
  },

  updateQuantity: (boxId, quantity) => {
    if (quantity <= 0) {
      const item = get().items.find(i => i.box.id === boxId);
      if (item) get().removeItem(boxId, item.isSuspended);
      return;
    }
    set(state => ({
      items: state.items.map(i => (i.box.id === boxId ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalAmount: () =>
    get().items.reduce((sum, i) => sum + i.box.discountedPrice * i.quantity, 0),

  getItemQuantity: (boxId) =>
    get().items.find(i => i.box.id === boxId)?.quantity ?? 0,
}));
