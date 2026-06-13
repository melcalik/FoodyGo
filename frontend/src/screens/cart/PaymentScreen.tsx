import React, { useState, useEffect } from 'react';
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
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { usePaymentStore } from '../../store/usePaymentStore';

type Props = NativeStackScreenProps<CartStackParamList, 'Payment'>;

export default function PaymentScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { totalAmount, items, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { paymentMethods, fetchPaymentMethods, addPaymentMethod, setLastUsed } = usePaymentStore();
  const total = totalAmount();

  const [selectedMethodId, setSelectedMethodId] = useState<string>('new');
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newCardName, setNewCardName] = useState('');

  const formatCardNumber = (text: string) => {
    const numericValue = text.replace(/\D/g, '');
    const formatted = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const formatExpiry = (text: string) => {
    const numericValue = text.replace(/\D/g, '');
    if (numericValue.length >= 3) {
      setExpiry(`${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}`);
    } else {
      setExpiry(numericValue);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0 && selectedMethodId === 'new') {
      const lastUsed = paymentMethods.find(m => m.isLastUsed) || paymentMethods[0];
      setSelectedMethodId(lastUsed.id);
    }
  }, [paymentMethods]);

  const handlePay = async () => {
    if (items.length === 0) return;

    if (selectedMethodId === 'new') {
      if (!name || !cardNumber || !expiry || !cvv) {
        Alert.alert(t('common.error'), t('payment.fillAll'));
        return;
      }

      const cleanCard = cardNumber.replace(/\D/g, '');
      const cleanExpiry = expiry.replace(/\D/g, '');

      if (cleanCard.length !== 16) {
        Alert.alert(t('common.error'), 'Kart numarası tam 16 rakam olmalıdır.');
        return;
      }
      if (cleanExpiry.length !== 4) {
        Alert.alert(t('common.error'), 'Son kullanma tarihi tam 4 rakam olmalıdır (AA/YY).');
        return;
      }
      if (cvv.length !== 3) {
        Alert.alert(t('common.error'), 'CVV tam 3 rakam olmalıdır.');
        return;
      }
    }

    setIsProcessing(true);
    
    try {
      const rest = items[0].restaurant;
      await createOrder(items, rest.id, rest.name, rest.image);
      clearCart();
      setIsProcessing(false);

      if (selectedMethodId === 'new') {
        setShowSaveModal(true);
      } else {
        await setLastUsed(selectedMethodId);
        navigation.replace('PaymentSuccess');
      }
    } catch (error: any) {
      setIsProcessing(false);
      Alert.alert(
        t('common.error'),
        error.response?.data?.message ?? t('payment.orderError')
      );
    }
  };

  const handleSaveCard = async () => {
    if (!newCardName) return;
    await addPaymentMethod({
      cardName: newCardName,
      cardNumber,
      cardHolderName: name,
      expiry,
      cvv,
    });
    setShowSaveModal(false);
    navigation.replace('PaymentSuccess');
  };

  if (showSaveModal) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t('payment.saveCardTitle')}</Text>
          </View>
          <View style={{ flex: 1, padding: Spacing.lg, justifyContent: 'center' }}>
            <View style={{ backgroundColor: Colors.surface, padding: Spacing.xl, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.surfaceBorder }}>
              <Text style={{ fontSize: FontSize.lg, color: Colors.textSecondary, marginBottom: Spacing.xl, textAlign: 'center' }}>
                {t('payment.saveCardPrompt')}
              </Text>
              
              <Text style={styles.label}>{t('payment.cardName')}</Text>
              <TextInput
                style={[styles.input, { flex: undefined, color: Colors.textPrimary, width: '100%', marginTop: 8, marginBottom: Spacing.xl }]}
                value={newCardName}
                onChangeText={setNewCardName}
                placeholder="Örn: İş Kartım"
                autoFocus={true}
              />

              <View style={{ flexDirection: 'row', gap: Spacing.md }}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.surfaceBorder }]}
                  onPress={() => navigation.replace('PaymentSuccess')}
                >
                  <Text style={[styles.modalBtnText, { color: Colors.textPrimary }]}>{t('common.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: Colors.primary }]}
                  onPress={handleSaveCard}
                >
                  <Text style={styles.modalBtnText}>{t('common.save')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('payment.title')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>{t('payment.amountToPay')}</Text>
            <Text style={styles.amountValue}>₺{total}</Text>
          </View>

          <Text style={styles.sectionTitle}>{t('profile.paymentMethods')}</Text>
          <View style={styles.selectorGroup}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                style={[styles.selectorItem, selectedMethodId === method.id && styles.selectorItemActive]}
                onPress={() => setSelectedMethodId(method.id)}
              >
                <View style={styles.selectorRadio}>
                  {selectedMethodId === method.id && <View style={styles.selectorRadioInner} />}
                </View>
                <Ionicons name="card" size={24} color={Colors.textPrimary} style={{ marginRight: Spacing.sm }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.selectorName}>{method.cardName}</Text>
                  <Text style={styles.selectorDesc}>**** {method.cardNumber.slice(-4)}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.selectorItem, selectedMethodId === 'new' && styles.selectorItemActive]}
              onPress={() => setSelectedMethodId('new')}
            >
              <View style={styles.selectorRadio}>
                {selectedMethodId === 'new' && <View style={styles.selectorRadioInner} />}
              </View>
              <Ionicons name="add-circle-outline" size={24} color={Colors.textPrimary} style={{ marginRight: Spacing.sm }} />
              <Text style={styles.selectorName}>{t('payment.payWithAnother')}</Text>
            </TouchableOpacity>
          </View>

          {selectedMethodId === 'new' && (
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
                  <Ionicons name="card" size={20} color={Colors.textPrimary} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    value={cardNumber}
                    onChangeText={formatCardNumber}
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
                    onChangeText={formatExpiry}
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
            </View>
          )}

          <View style={styles.noteBox}>
            <Ionicons name="lock-closed" size={20} color={Colors.textSecondary} />
            <Text style={styles.noteText}>{t('payment.sslNote')}</Text>
          </View>
        </ScrollView>

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

  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },

  amountBox: { backgroundColor: Colors.primary + '11', borderWidth: 1, borderColor: Colors.primary + '33', borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', marginBottom: Spacing.lg },
  amountLabel: { fontSize: FontSize.sm, color: Colors.primary, marginBottom: 4 },
  amountValue: { fontSize: 32, fontWeight: FontWeight.extrabold, color: Colors.primary },

  sectionTitle: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.sm },
  selectorGroup: { marginBottom: Spacing.lg },
  selectorItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.surfaceBorder, marginBottom: Spacing.sm },
  selectorItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '05' },
  selectorRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.surfaceBorder, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  selectorRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  selectorName: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.textPrimary },
  selectorDesc: { fontSize: FontSize.xs, color: Colors.textSecondary },

  form: { gap: Spacing.md },
  row: { flexDirection: 'row' },
  inputGroup: { gap: 6 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.surfaceBorder, paddingHorizontal: Spacing.md },
  input: { flex: 1, height: 52, color: Colors.textPrimary, fontSize: FontSize.md, backgroundColor: Colors.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.surfaceBorder, paddingHorizontal: Spacing.md },

  noteBox: { flexDirection: 'row', backgroundColor: Colors.surfaceElevated, padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.md, gap: 10 },
  noteText: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 18 },

  footer: { padding: Spacing.md, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.surfaceBorder },
  payBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  payBtnDisabled: { opacity: 0.7 },
  payBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  payBtnAmount: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.white, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: Spacing.lg },
  modalContent: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.lg, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.sm },
  modalDesc: { fontSize: FontSize.sm, color: Colors.textSecondary },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Spacing.lg },
  modalBtn: { paddingHorizontal: Spacing.lg, paddingVertical: 12, borderRadius: Radius.md, flex: 1, alignItems: 'center' },
  modalBtnText: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.white },
});
