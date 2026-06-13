import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { usePaymentStore } from '../../store/usePaymentStore';
import { PaymentMethodsScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PaymentMethods'>;

export default function PaymentMethodsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { paymentMethods, isLoading, fetchPaymentMethods, addPaymentMethod, deletePaymentMethod, setLastUsed } = usePaymentStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAdd = async () => {
    if (!cardName || !cardNumber || !cardHolder || !expiry || !cvv) {
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

    setIsSubmitting(true);
    const success = await addPaymentMethod({
      cardName,
      cardNumber,
      cardHolderName: cardHolder,
      expiry,
      cvv,
    });
    setIsSubmitting(false);

    if (success) {
      setShowAddForm(false);
      setCardName('');
      setCardNumber('');
      setCardHolder('');
      setExpiry('');
      setCvv('');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(t('payment.deleteMethod'), t('payment.deleteConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: () => deletePaymentMethod(id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('profile.paymentMethods')}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddForm(!showAddForm)}>
            <Text style={styles.addBtnText}>{showAddForm ? t('common.cancel') : '+'}</Text>
          </TouchableOpacity>
        </View>

        {showAddForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{t('payment.addCard')}</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('payment.cardName')}</Text>
              <TextInput style={styles.input} value={cardName} onChangeText={setCardName} placeholder="Örn: İş Kartım" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('payment.cardHolderName')}</Text>
              <TextInput style={styles.input} value={cardHolder} onChangeText={setCardHolder} placeholder="AD SOYAD" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('payment.cardNumber')}</Text>
              <TextInput style={styles.input} value={cardNumber} onChangeText={formatCardNumber} placeholder="0000 0000 0000 0000" keyboardType="numeric" maxLength={19} />
            </View>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                <Text style={styles.label}>{t('payment.expiry')}</Text>
                <TextInput style={styles.input} value={expiry} onChangeText={formatExpiry} placeholder="AA/YY" keyboardType="numeric" maxLength={5} />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput style={styles.input} value={cvv} onChangeText={setCvv} placeholder="123" keyboardType="numeric" maxLength={3} secureTextEntry />
              </View>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={handleAdd} disabled={isSubmitting}>
              {isSubmitting ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitBtnText}>{t('common.save')}</Text>}
            </TouchableOpacity>
          </View>
        )}

        {isLoading && !showAddForm ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            contentContainerStyle={styles.list}
            data={paymentMethods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{item.cardName} {item.isLastUsed && <Text style={styles.lastUsedBadge}>(Son Kullanılan)</Text>}</Text>
                  <Text style={styles.cardNumber}>**** **** **** {item.cardNumber.slice(-4) || '****'}</Text>
                </View>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              !showAddForm ? <Text style={styles.emptyText}>{t('payment.noSavedMethods')}</Text> : null
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

