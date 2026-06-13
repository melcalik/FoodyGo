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
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { OrdersStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useReviewStore } from '../../store/useReviewStore';
import { ReviewScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<OrdersStackParamList, 'Review'>;

export default function ReviewScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { order } = route.params;
  const { submitReview, isLoading } = useReviewStore();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await submitReview(order.restaurantId, order.id, rating, comment);
      Alert.alert(t('review.thankYou'), t('review.success'), [
        { text: t('common.done'), onPress: () => navigation.goBack() }
      ]);
    } catch (e: any) {
      Alert.alert(t('common.error'), e.message || t('review.error'));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('review.title')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          
          <View style={styles.infoCard}>
            <Text style={styles.restaurantName}>{order.restaurantName}</Text>
            <Text style={styles.itemsText}>
              {order.items.map(i => `${i.quantity}x ${i.boxName}`).join(', ')}
            </Text>
          </View>

          <Text style={styles.questionText}>{t('review.howWasIt')}</Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons 
                  name={star <= rating ? "star" : "star-outline"} 
                  size={40} 
                  color={star <= rating ? "#FBBF24" : Colors.textMuted} 
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>
            {rating === 0 ? t('review.tapToRate') : 
             rating < 3 ? t('review.bad') : 
             rating < 5 ? t('review.good') : t('review.great')}
          </Text>

          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder={t('review.commentPlaceholder')}
              placeholderTextColor={Colors.textMuted}
              multiline
              textAlignVertical="top"
              value={comment}
              onChangeText={setComment}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitBtn, (rating === 0 || isLoading) && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={rating === 0 || isLoading}
          >
            <Text style={styles.submitBtnText}>{isLoading ? t('review.submitting') : t('review.submit')}</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

