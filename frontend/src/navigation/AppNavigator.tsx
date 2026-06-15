import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthStore } from '../store/useAuthStore';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/auth/SplashScreen';
import { useNotificationStore } from '../store/useNotificationStore';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, hydrate } = useAuthStore();
  const [isAppReady, setIsAppReady] = useState(false);

  const { initializeSignalR, stopSignalR } = useNotificationStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      initializeSignalR();
    } else {
      stopSignalR();
    }
  }, [isAuthenticated]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {isAuthenticated ? (
          <Root.Screen name="Main" component={MainNavigator} />
        ) : (
          <Root.Screen name="Auth" component={AuthNavigator} />
        )}
      </Root.Navigator>

      {!isAppReady && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}>
          <SplashScreen onComplete={() => setIsAppReady(true)} />
        </View>
      )}
    </View>
  );
}
