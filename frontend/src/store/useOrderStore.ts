import { create } from 'zustand';
import { Order, OrderStatus, CartItem, OrderItem } from '../types';
import api from '../services/api';
import { restaurantImageMap } from '../utils/imageMap';

const STATUS_MAP: Record<number, OrderStatus> = {
  1: 'preparing',
  2: 'preparing',
  3: 'preparing',
  4: 'ready',
  5: 'pickedUp',
  6: 'cancelled',
};

const mapOrderItem = (i: any): OrderItem => ({
  boxId: i.boxId,
  boxName: i.boxName,
  quantity: i.quantity,
  unitPrice: i.unitPrice,
  isSuspended: i.isSuspended,
});

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;
  isLoading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  createOrder: (items: CartItem[], restaurantId: string, restaurantName: string, restaurantImage: any) => Promise<Order>;
  setActiveOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  activeOrder: null,
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/Orders');
      const mappedOrders: Order[] = response.data.map((o: any) => ({
        id: o.id,
        restaurantId: o.restaurantId,
        restaurantName: o.restaurantName,
        restaurantImage: o.restaurantImageUrl && restaurantImageMap[o.restaurantImageUrl]
          ? restaurantImageMap[o.restaurantImageUrl]
          : require('../assets/images/restaurants/sweet.png'),
        items: o.items.map(mapOrderItem),
        totalAmount: o.totalAmount,
        status: STATUS_MAP[o.status] ?? 'preparing',
        type: o.type === 1 ? 'normal' : o.type === 3 ? 'claimedSuspended' : 'suspended',
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt ?? o.createdAt),
        isReviewed: o.isReviewed,
      }));
      set({ orders: mappedOrders, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch orders:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  createOrder: async (items, restaurantId, restaurantName, restaurantImage) => {
    set({ isLoading: true, error: null });
    try {
      const payload = {
        restaurantId,
        type: items.every(i => i.isSuspended) ? 2 : (items.every(i => i.isClaimingMealId) ? 3 : 1),
        items: items.map(i => ({
          boxId: i.box.id,
          quantity: i.quantity,
          isSuspended: i.isSuspended,
          claimingSuspendedMealId: i.isClaimingMealId,
        })),
      };

      const response = await api.post('/Orders', payload);
      const o = response.data;

      const newOrder: Order = {
        id: o.id,
        restaurantId: o.restaurantId,
        restaurantName: o.restaurantName,
        restaurantImage,
        items: o.items.map(mapOrderItem),
        totalAmount: o.totalAmount,
        status: STATUS_MAP[o.status] ?? 'preparing',
        type: o.type === 1 ? 'normal' : o.type === 3 ? 'claimedSuspended' : 'suspended',
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt ?? o.createdAt),
      };

      set(state => ({
        orders: [newOrder, ...state.orders],
        activeOrder: newOrder,
        isLoading: false,
      }));

      return newOrder;
    } catch (error: any) {
      let errorMsg = error.message;
      if (error.response?.data) {
        if (typeof error.response.data === 'string') errorMsg = error.response.data;
        else if (error.response.data.message) errorMsg = error.response.data.message;
        else if (error.response.data.detail) errorMsg = error.response.data.detail;
      }
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  setActiveOrder: (order) => set({ activeOrder: order }),
}));
