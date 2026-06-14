import { create } from 'zustand';
import { CartItem, SurpriseBox, Restaurant } from '../types';

interface CartState {
  items: CartItem[];

  addItem: (box: SurpriseBox, restaurant: Restaurant, isSuspended?: boolean, isClaimingMealId?: string) => void;
  removeItem: (boxId: string, isSuspended: boolean, isClaimingMealId?: string) => void;
  updateQuantity: (boxId: string, quantity: number, isSuspended: boolean, isClaimingMealId?: string) => void;
  clearCart: () => void;

  totalItems: () => number;
  totalAmount: () => number;
  getItemQuantity: (boxId: string, isSuspended: boolean) => number;
  getClaimedQuantity: (boxId: string) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (box, restaurant, isSuspended = false, isClaimingMealId) => {
    if (isClaimingMealId) {
      box = { ...box, discountedPrice: 0, originalPrice: 0 };
    }
    set(state => {
      const existing = state.items.find(
        i => i.box.id === box.id && i.isSuspended === isSuspended && i.isClaimingMealId === isClaimingMealId,
      );
      if (existing) {
        return {
          items: state.items.map(i =>
            i.box.id === box.id && i.isSuspended === isSuspended && i.isClaimingMealId === isClaimingMealId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { box, restaurant, quantity: 1, isSuspended, isClaimingMealId }] };
    });
  },

  removeItem: (boxId, isSuspended, isClaimingMealId) => {
    set(state => ({
      items: state.items.filter(
        i => !(i.box.id === boxId && i.isSuspended === isSuspended && i.isClaimingMealId === isClaimingMealId),
      ),
    }));
  },

  updateQuantity: (boxId, quantity, isSuspended, isClaimingMealId) => {
    if (quantity <= 0) {
      get().removeItem(boxId, isSuspended, isClaimingMealId);
      return;
    }
    set(state => ({
      items: state.items.map(i => (i.box.id === boxId && i.isSuspended === isSuspended && i.isClaimingMealId === isClaimingMealId ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalAmount: () =>
    get().items.reduce((sum, i) => sum + i.box.discountedPrice * i.quantity, 0),

  getItemQuantity: (boxId, isSuspended) =>
    get().items.find(i => i.box.id === boxId && i.isSuspended === isSuspended && !i.isClaimingMealId)?.quantity ?? 0,

  getClaimedQuantity: (boxId) =>
    get().items.find(i => i.box.id === boxId && !!i.isClaimingMealId)?.quantity ?? 0,
}));
