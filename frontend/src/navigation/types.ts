import { Restaurant, SurpriseBox, Order } from '../types';

// ─── Auth Stack ───────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

// ─── Home Stack ───────────────────────────────────────────────────────────────
export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurant: Restaurant };
};

// ─── Cart Stack ───────────────────────────────────────────────────────────────
export type CartStackParamList = {
  Cart: undefined;
  Payment: undefined;
  PaymentSuccess: undefined;
  OrderTracking: { orderId: string };
  Review: { order: Order };
};

// ─── Orders Stack ────────────────────────────────────────────────────────────
export type OrdersStackParamList = {
  OrderHistory: undefined;
  OrderTracking: { orderId: string };
  Review: { order: Order };
};

// ─── Suspended Stack ─────────────────────────────────────────────────────────
export type SuspendedStackParamList = {
  SuspendedMeal: undefined;
};

// ─── Profile Stack ────────────────────────────────────────────────────────────
export type ProfileStackParamList = {
  Profile: undefined;
};

// ─── Bottom Tabs ─────────────────────────────────────────────────────────────
export type MainTabParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  OrdersTab: undefined;
  SuspendedTab: undefined;
  ProfileTab: undefined;
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
