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
        <Text style={styles.mainHeading}>FoodyGo Kullanım Şartları</Text>
        <Text style={styles.paragraph}>FoodyGo uygulamasını kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız.</Text>

        <Text style={styles.sectionHeading}>1. Hizmetin Amacı</Text>
        <Text style={styles.paragraph}>FoodyGo, restoran ve kafelerdeki tüketilebilir durumdaki fazla ürünlerin israf edilmeden kullanıcılara sunulmasını amaçlar.</Text>

        <Text style={styles.sectionHeading}>2. Kullanıcı Sorumlulukları</Text>
        <Text style={styles.paragraph}>Kullanıcılar, kayıt sırasında doğru bilgi vermekle ve hesap güvenliğini korumakla sorumludur. Uygulama kurallarına aykırı hareket eden hesaplar askıya alınabilir.</Text>

        <Text style={styles.sectionHeading}>3. Sipariş ve Teslim Alma</Text>
        <Text style={styles.paragraph}>Kullanıcı, sipariş verdiği ürünleri belirtilen teslim alma saatleri içerisinde restorandan teslim almakla yükümlüdür. Teslim alınmayan ürünlerin iadesi yapılmaz.</Text>

        <Text style={styles.sectionHeading}>4. Askıda Yemek</Text>
        <Text style={styles.paragraph}>Askıda yemek sistemi, sosyal yardımlaşmayı desteklemek amacıyla geliştirilmiştir. Yapılan bağışlar ihtiyaç sahiplerine ulaştırılmak üzere sisteme kaydedilir. Kötüye kullanım tespiti halinde işlem iptal edilir.</Text>

        <Text style={styles.sectionHeading}>5. Gizlilik</Text>
        <Text style={styles.paragraph}>Kullanıcı bilgileri yalnızca uygulama hizmetlerinin sağlanması amacıyla kullanılır ve güvenli şekilde saklanır. Üçüncü taraflarla izinsiz paylaşılmaz.</Text>

        <Text style={styles.sectionHeading}>6. Ödeme İşlemleri</Text>
        <Text style={styles.paragraph}>Kullanıcıların yaptıkları ödemeler güvenlik protokolleriyle korunur. Yapılan satın alımlarda ve bağışlarda belirtilen tutarlar anında tahsil edilir.</Text>
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
