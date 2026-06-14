
import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OrdersStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useOrderStore } from '../../store/useOrderStore';
import { OrderTrackingScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<OrdersStackParamList, 'OrderTracking'>;

const getStatusSteps = (t: any) => [
  { key: 'preparing', title: t('order.preparing'), icon: 'restaurant' },
  { key: 'ready', title: t('order.ready'), icon: 'bag-handle' },
  { key: 'pickedUp', title: t('order.pickedUp'), icon: 'checkmark-circle' },
];

export default function OrderTrackingScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { orderId } = route.params;
  const { orders, fetchOrders } = useOrderStore();

  const order = useMemo(() => orders.find(o => o.id === orderId), [orders, orderId]);
  const STATUS_STEPS = order?.type === 'suspended'
    ? [{ key: 'suspended_left', title: 'Ürün Askıya Bırakıldı', icon: 'heart' }]
    : getStatusSteps(t);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (order && order.status !== 'pickedUp' && order.status !== 'cancelled' && order.type !== 'suspended') {
      interval = setInterval(() => {
        fetchOrders();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [order?.status, order?.type]);

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{t('order.notFound')}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.backBtnText}>{t('common.back')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentStepIndex = order.type === 'suspended' 
    ? 0 
    : STATUS_STEPS.findIndex(s => s.key === order.status);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.navigate('OrderHistory')}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('order.tracking')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={40} color={Colors.textPrimary} style={{ marginBottom: 8, opacity: 0.5 }} />
          <Text style={styles.mapText}>{t('order.mapView')}</Text>
          
          <View style={styles.codeCard}>
            <Text style={styles.codeLabel}>{t('order.deliveryCode')}</Text>
            <Text style={styles.codeValue}>{order.id.slice(-4).toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.trackerCard}>
          <Text style={styles.trackerTitle}>{t('order.status')}</Text>
          <View style={styles.stepper}>
            {STATUS_STEPS.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex;
              
              return (
                <View key={step.key} style={styles.stepRow}>
                  <View style={styles.stepIndicator}>
                    <View style={[
                      styles.stepCircle,
                      (isActive || isPast) ? styles.stepCircleActive : null,
                    ]}>
                      <Ionicons 
                        name={step.icon} 
                        size={16} 
                        color={(isActive || isPast) ? Colors.primary : Colors.textMuted} 
                      />
                    </View>
                    {index < STATUS_STEPS.length - 1 && (
                      <View style={[
                        styles.stepLine,
                        isPast ? styles.stepLineActive : null,
                      ]} />
                    )}
                  </View>
                  <View style={styles.stepInfo}>
                    <Text style={[
                      styles.stepTitle,
                      (isActive || isPast) ? styles.stepTitleActive : null,
                    ]}>
                      {step.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>{t('order.details')}</Text>
          <Text style={styles.restaurantName}>{order.restaurantName}</Text>
          
          <View style={styles.itemsList}>
            {order.items.map((item, idx) => (
              <View key={`${item.boxId}-${idx}`} style={styles.itemRow}>
                <Text style={styles.itemQty}>{item.quantity}x</Text>
                <Text style={styles.itemName}>{item.boxName}</Text>
                {item.isSuspended && (
                  <View style={styles.suspendedBadge}>
                    <Text style={styles.suspendedText}>{t('cart.suspended')}</Text>
                  </View>
                )}
                <Text style={styles.itemPrice}>₺{item.unitPrice * item.quantity}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('cart.total')}</Text>
            <Text style={styles.totalValue}>₺{order.totalAmount}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

