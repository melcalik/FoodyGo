import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MainTabParamList, HomeStackParamList, CartStackParamList, OrdersStackParamList, ProfileStackParamList } from './types';
import { Colors, FontSize } from '../constants/theme';
import { useCartStore } from '../store/useCartStore';

import HomeScreen from '../screens/home/HomeScreen';
import RestaurantDetailScreen from '../screens/restaurant/RestaurantDetailScreen';
import CartScreen from '../screens/cart/CartScreen';
import PaymentScreen from '../screens/cart/PaymentScreen';
import PaymentSuccessScreen from '../screens/cart/PaymentSuccessScreen';
import OrderTrackingScreen from '../screens/orders/OrderTrackingScreen';
import OrderHistoryScreen from '../screens/orders/OrderHistoryScreen';
import ReviewScreen from '../screens/orders/ReviewScreen';
import SuspendedMealScreen from '../screens/suspended/SuspendedMealScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import PaymentMethodsScreen from '../screens/profile/PaymentMethodsScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
    </HomeStack.Navigator>
  );
}

const CartStack = createNativeStackNavigator<CartStackParamList>();
function CartStackNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Payment" component={PaymentScreen} />
      <CartStack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <CartStack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <CartStack.Screen name="Review" component={ReviewScreen} />
    </CartStack.Navigator>
  );
}

const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();
function OrdersStackNavigator() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <OrdersStack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <OrdersStack.Screen name="Review" component={ReviewScreen} />
    </OrdersStack.Navigator>
  );
}

import AddressesScreen from '../screens/profile/AddressesScreen';
import HelpCenterScreen from '../screens/profile/HelpCenterScreen';
import TermsOfServiceScreen from '../screens/profile/TermsOfServiceScreen';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <ProfileStack.Screen name="Addresses" component={AddressesScreen} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <ProfileStack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
    </ProfileStack.Navigator>
  );
}

function TabIcon({ icon, focused, badge }: { icon: string; focused: boolean; badge?: number }) {
  return (
    <View style={styles.tabIconWrap}>
      <Ionicons 
        name={focused ? icon : `${icon}-outline`} 
        size={24} 
        color={focused ? Colors.primary : Colors.textMuted} 
        style={focused ? styles.tabEmojiFocused : undefined} 
      />
      {badge != null && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  const { t } = useTranslation();
  const totalItems = useCartStore(s => s.totalItems());

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
              Restoranlar
            </Text>
          ),
          tabBarIcon: ({ focused }) => <TabIcon icon="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStackNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.7}>
              {t('cart.title')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="cart" focused={focused} badge={totalItems} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStackNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.7}>
              {t('order.title')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => <TabIcon icon="cube" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SuspendedTab"
        component={SuspendedMealScreen as any}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.7}>
              {t('suspended.title').replace(' ', '\n')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => <TabIcon icon="heart" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator as any}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.7}>
              {t('profile.title')}
            </Text>
          ),
          tabBarIcon: ({ focused }) => <TabIcon icon="person" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.surfaceBorder,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 11,
    width: '100%',
  },
  tabIconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEmojiFocused: {
    transform: [{ scale: 1.1 }],
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
