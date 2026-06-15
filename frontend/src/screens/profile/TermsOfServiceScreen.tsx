import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TermsOfService'>;

export default function TermsOfServiceScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('profile.termsOfService', { defaultValue: 'Kullanım Şartları' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.mainHeading}>{t('profile.termsHeading')}</Text>
        <Text style={styles.paragraph}>{t('profile.termsDesc')}</Text>

        <Text style={styles.sectionHeading}>{t('profile.terms1Title')}</Text>
        <Text style={styles.paragraph}>{t('profile.terms1Desc')}</Text>

        <Text style={styles.sectionHeading}>{t('profile.terms2Title')}</Text>
        <Text style={styles.paragraph}>{t('profile.terms2Desc')}</Text>

        <Text style={styles.sectionHeading}>{t('profile.terms3Title')}</Text>
        <Text style={styles.paragraph}>{t('profile.terms3Desc')}</Text>

        <Text style={styles.sectionHeading}>{t('profile.terms4Title')}</Text>
        <Text style={styles.paragraph}>{t('profile.terms4Desc')}</Text>

        <Text style={styles.sectionHeading}>{t('profile.terms5Title')}</Text>
        <Text style={styles.paragraph}>{t('profile.terms5Desc')}</Text>

        <Text style={styles.sectionHeading}>{t('profile.terms6Title')}</Text>
        <Text style={styles.paragraph}>{t('profile.terms6Desc')}</Text>
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
  sectionHeading: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  paragraph: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
