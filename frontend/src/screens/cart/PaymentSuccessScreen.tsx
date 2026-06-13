import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { CartStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useOrderStore } from '../../store/useOrderStore';

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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.success },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  check: {
    fontSize: 50,
    color: Colors.success,
    fontWeight: 'bold',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: Spacing.xl,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: 12,
  },
  statsEmoji: { fontSize: 24 },
  statsText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.white,
    lineHeight: 20,
  },
  statsBold: { fontWeight: FontWeight.bold },

  footer: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  btnPrimary: {
    backgroundColor: Colors.white,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.success,
  },
  btnSecondary: {
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  btnSecondaryText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
});
