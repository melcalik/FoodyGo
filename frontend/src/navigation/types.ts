import { Restaurant, SurpriseBox, Order } from '../types';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurant: Restaurant };
  RestaurantReviews: { restaurant: Restaurant };
  Notifications: undefined;
};

export type CartStackParamList = {
  Cart: undefined;
  Payment: undefined;
  PaymentSuccess: undefined;
  OrderTracking: { orderId: string };
  Review: { order: Order };
};

export type OrdersStackParamList = {
  OrderHistory: undefined;
  OrderTracking: { orderId: string };
  Review: { order: Order };
};

export type SuspendedStackParamList = {
  SuspendedMeal: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  PaymentMethods: undefined;
  Addresses: undefined;
  HelpCenter: undefined;
  TermsOfService: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  OrdersTab: undefined;
  SuspendedTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
