import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<ProfileStackParamList, 'HelpCenter'>;

export default function HelpCenterScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('profile.helpCenter', { defaultValue: 'Yardım Merkezi' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.mainHeading}>{t('profile.helpCenterHeading')}</Text>
        <Text style={styles.paragraph}>{t('profile.helpCenterIntro')}</Text>

        <Text style={styles.sectionTitle}>{t('profile.faqTitle')}</Text>

        <Text style={styles.question}>{t('profile.faqQ1')}</Text>
        <Text style={styles.answer}>{t('profile.faqA1')}</Text>

        <Text style={styles.question}>{t('profile.faqQ2')}</Text>
        <Text style={styles.answer}>{t('profile.faqA2')}</Text>

        <Text style={styles.question}>{t('profile.faqQ3')}</Text>
        <Text style={styles.answer}>{t('profile.helpCenterDesc')}</Text>

        <Text style={styles.question}>{t('profile.faqQ4')}</Text>
        <Text style={styles.answer}>{t('profile.faqA4')}</Text>

        <Text style={styles.sectionTitle}>{t('profile.contactInfo')}</Text>
        <Text style={styles.contactItem}>Cenker Tüzün - 202103011033@dogus.edu.tr</Text>
        <Text style={styles.contactItem}>Nazlı İlayda Karademir - 202203011017@dogus.edu.tr</Text>
        <Text style={styles.contactItem}>Buse Sarıçayır - 202203011040@dogus.edu.tr</Text>
        <Text style={styles.contactItem}>Melike Çalık - 202203011068@dogus.edu.tr</Text>
        <Text style={styles.contactItem}>Aleyna Parkaz - 202203011071@dogus.edu.tr</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  content: { flex: 1 },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  mainHeading: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  paragraph: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  question: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  answer: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  contactItem: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
});
