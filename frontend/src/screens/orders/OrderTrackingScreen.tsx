
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
  const STATUS_STEPS = getStatusSteps(t);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (order && order.status !== 'pickedUp' && order.status !== 'cancelled') {
      interval = setInterval(() => {
        fetchOrders();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [order?.status]);

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{t('order.notFound')}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>{t('common.back')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === order.status);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.goBack()}>
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
                    {isActive && (
                      <Text style={styles.stepDesc}>{t('order.currentStage')}</Text>
                    )}
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: 40 },

  errorText: { textAlign: 'center', marginTop: 40, fontSize: FontSize.md },
  backBtn: { alignSelf: 'center', marginTop: 20, padding: 10 },
  backBtnText: { color: Colors.primary, fontWeight: 'bold' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  mapText: { fontSize: FontSize.sm, color: Colors.textMuted },
  codeCard: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeLabel: { fontSize: 10, color: Colors.textSecondary, marginBottom: 2 },
  codeValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },

  trackerCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  trackerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  stepper: { paddingLeft: 10 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start' },
  stepIndicator: { alignItems: 'center', width: 40 },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary + '22',
    borderColor: Colors.primary,
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: -2,
    zIndex: 1,
  },
  stepLineActive: { backgroundColor: Colors.primary },
  
  stepInfo: { flex: 1, paddingTop: 6, paddingBottom: 20 },
  stepTitle: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.textMuted },
  stepTitleActive: { color: Colors.textPrimary, fontWeight: FontWeight.bold },
  stepDesc: { fontSize: FontSize.xs, color: Colors.primary, marginTop: 4, fontWeight: FontWeight.medium },

  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  detailsTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    paddingVertical: Spacing.sm,
    gap: 8,
    marginBottom: Spacing.sm,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemQty: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary, width: 24 },
  itemName: { flex: 1, fontSize: FontSize.sm, color: Colors.textPrimary },
  itemPrice: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  
  suspendedBadge: {
    backgroundColor: Colors.teal + '22',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  suspendedText: { fontSize: 10, color: Colors.teal, fontWeight: 'bold' },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  totalValue: { fontSize: FontSize.lg, fontWeight: FontWeight.extrabold, color: Colors.primary },
});
