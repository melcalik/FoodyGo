import { Restaurant, SurpriseBox, Order } from '../types';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurant: Restaurant };
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
