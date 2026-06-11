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
import { OrdersStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useReviewStore } from '../../store/useReviewStore';

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
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('review.title')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Restaurant Info */}
          <View style={styles.infoCard}>
            <Text style={styles.restaurantName}>{order.restaurantName}</Text>
            <Text style={styles.itemsText}>
              {order.items.map(i => `${i.quantity}x ${i.boxName}`).join(', ')}
            </Text>
          </View>

          <Text style={styles.questionText}>{t('review.howWasIt')}</Text>

          {/* Stars */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.starIcon, star <= rating && styles.starIconActive]}>
                  {star <= rating ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>
            {rating === 0 ? t('review.tapToRate') : 
             rating < 3 ? t('review.bad') : 
             rating < 5 ? t('review.good') : t('review.great')}
          </Text>

          {/* Comment */}
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

  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  restaurantName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: 4 },
  itemsText: { fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center' },

  questionText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  starIcon: { fontSize: 40, color: Colors.textMuted },
  starIconActive: { color: Colors.star },

  ratingLabel: {
    textAlign: 'center',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },

  inputWrap: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.md,
    height: 120,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },

  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    backgroundColor: Colors.background,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
