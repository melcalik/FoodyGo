import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';

type Props = NativeStackScreenProps<CartStackParamList, 'Payment'>;

export default function PaymentScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { totalAmount, items, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const total = totalAmount();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    
    try {
      const rest = items[0].restaurant;
      await createOrder(items, rest.id, rest.name, rest.image);
      clearCart();
      setIsProcessing(false);
      navigation.replace('PaymentSuccess');
    } catch (error: any) {
      setIsProcessing(false);
      Alert.alert(
        t('common.error'),
        error.response?.data?.message ?? t('payment.orderError')
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('payment.title')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Amount Box */}
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>{t('payment.amountToPay')}</Text>
            <Text style={styles.amountValue}>₺{total}</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('payment.cardHolderName')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Örn: AD SOYAD"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('payment.cardNumber')}</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.cardIcon}>💳</Text>
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                <Text style={styles.label}>{t('payment.expiry')}</Text>
                <TextInput
                  style={styles.input}
                  value={expiry}
                  onChangeText={setExpiry}
                  placeholder="AA/YY"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Note */}
            <View style={styles.noteBox}>
              <Text style={styles.noteEmoji}>🔒</Text>
              <Text style={styles.noteText}>{t('payment.sslNote')}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.payBtn, isProcessing && styles.payBtnDisabled]}
            onPress={handlePay}
            disabled={isProcessing}
            activeOpacity={0.85}
          >
            {isProcessing ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <Text style={styles.payBtnText}>{t('payment.completePayment')}</Text>
                <Text style={styles.payBtnAmount}>₺{total}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { padding: Spacing.md },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
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
  backIcon: { fontSize: 20, color: Colors.textPrimary },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  amountBox: {
    backgroundColor: Colors.primary + '11',
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  amountLabel: { fontSize: FontSize.sm, color: Colors.primary, marginBottom: 4 },
  amountValue: { fontSize: 32, fontWeight: FontWeight.extrabold, color: Colors.primary },

  form: { gap: Spacing.md },
  row: { flexDirection: 'row' },
  inputGroup: { gap: 6 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
  },
  cardIcon: { fontSize: 20, marginRight: 8 },
  input: {
    flex: 1,
    height: 52,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
  },

  noteBox: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
    gap: 10,
  },
  noteEmoji: { fontSize: 20 },
  noteText: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 18 },

  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  payBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  payBtnDisabled: { opacity: 0.7 },
  payBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  payBtnAmount: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
