import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { CartStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useOrderStore } from '../../store/useOrderStore';
import { PaymentSuccessScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<CartStackParamList, 'PaymentSuccess'>;

export default function PaymentSuccessScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { activeOrder } = useOrderStore();

  const resetCartStack = () =>
    navigation.reset({ index: 0, routes: [{ name: 'Cart' }] });

  const handleTrackOrder = () => {
    resetCartStack();
    if (activeOrder) {
      navigation.getParent()?.navigate('OrdersTab', {
        screen: 'OrderTracking',
        params: { orderId: activeOrder.id },
      });
    } else {
      navigation.getParent()?.navigate('OrdersTab');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.success} />
      
      <View style={styles.content}>
        <View style={styles.circle}>
          <Text style={styles.check}>✓</Text>
        </View>
        
        <Text style={styles.title}>{t('payment.orderCreated')}</Text>
        <Text style={styles.subtitle}>
          {t('payment.successSubtitle')}
        </Text>

        <View style={styles.statsCard}>
          <Text style={styles.statsEmoji}>🌍</Text>
          <Text style={styles.statsText}>
            <Text style={styles.statsBold}>
              {t('payment.co2Saved', { 
                amount: activeOrder 
                  ? (activeOrder.items.reduce((sum, item) => sum + item.quantity, 0) * 2.5).toFixed(1) 
                  : '2.5' 
              })}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleTrackOrder}>
          <Text style={styles.btnPrimaryText}>{t('payment.trackOrder')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnSecondary} 
          onPress={() => {
            resetCartStack();
            navigation.getParent()?.navigate('HomeTab');
          }}
        >
          <Text style={styles.btnSecondaryText}>{t('common.backToHome')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

