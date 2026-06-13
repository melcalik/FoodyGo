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
import { PaymentScreenStyles as styles } from '../../styles/screenStyles';

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

    if (total > 0 && selectedMethodId === 'new') {
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

      if (total > 0 && selectedMethodId === 'new') {
        setShowSaveModal(true);
      } else {
        if (total > 0) {
          await setLastUsed(selectedMethodId);
        }
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

