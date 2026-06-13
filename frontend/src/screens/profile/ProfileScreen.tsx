import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const { user, userStats, logout, fetchUserStats } = useAuthStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchUserStats();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(t('profile.logout'), t('profile.logoutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('profile.logout'), style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editBtnText}>{t('profile.edit')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{userStats?.totalRescuedMeals || 0}</Text>
            <Text style={styles.statLabel}>{t('profile.savedBoxes')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{userStats?.totalSuspendedMeals || 0}</Text>
            <Text style={styles.statLabel}>{t('profile.suspendedBoxes')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>~{userStats?.totalCO2SavedKg || 0}{t('profile.kg')}</Text>
            <Text style={styles.statLabel}>{t('profile.savedCO2')}</Text>
          </View>
        </View>

        {userStats && userStats.totalMoneySaved > 0 && (
          <View style={styles.moneySavedBox}>
            <Text style={styles.moneySavedText}>
              {t('profile.moneySaved')} <Text style={styles.moneySavedVal}>{userStats.totalMoneySaved} {t('common.tl')}</Text> {t('profile.moneySavedSuffix')}
            </Text>
          </View>
        )}

        <View style={styles.menuGroup}>
          <Text style={styles.menuTitle}>{t('profile.account')}</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert(t('common.comingSoon'), t('common.comingSoonMsg'))}
          >
            <Ionicons name="location" size={20} color={Colors.textPrimary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{t('profile.addresses')}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.menuItemArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <Ionicons name="card" size={20} color={Colors.textPrimary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{t('profile.paymentMethods')}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.menuItemArrow} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert(t('common.comingSoon'), t('common.comingSoonMsg'))}
          >
            <Ionicons name="notifications" size={20} color={Colors.textPrimary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{t('profile.notificationSettings')}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.menuItemArrow} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')}
          >
            <Ionicons name="earth" size={20} color={Colors.textPrimary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{t('profile.switchLang')}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.menuItemArrow} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuGroup}>
          <Text style={styles.menuTitle}>{t('profile.support')}</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert(t('common.comingSoon'), t('common.comingSoonMsg'))}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color={Colors.textPrimary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{t('profile.helpCenter')}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.menuItemArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert(t('common.comingSoon'), t('common.comingSoonMsg'))}
          >
            <Ionicons name="document-text" size={20} color={Colors.textPrimary} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{t('profile.termsOfService')}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.menuItemArrow} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>{t('profile.logout')}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: 40 },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary + '22',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
  userInfo: { flex: 1 },
  userName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: 4 },
  userEmail: { fontSize: FontSize.sm, color: Colors.textSecondary },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  editBtnText: { fontSize: FontSize.xs, fontWeight: 'bold', color: Colors.textPrimary },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.xl,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary, marginBottom: 2 },
  statLabel: { fontSize: 10, color: Colors.textSecondary, textAlign: 'center' },
  statDivider: { width: 1, height: 30, backgroundColor: Colors.surfaceBorder },

  moneySavedBox: {
    backgroundColor: Colors.primary + '15',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  moneySavedText: { fontSize: FontSize.md, color: Colors.textPrimary, textAlign: 'center' },
  moneySavedVal: { fontWeight: FontWeight.bold, color: Colors.primary },

  menuGroup: { marginBottom: Spacing.lg },
  menuTitle: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  menuItemIcon: { marginRight: Spacing.md },
  menuItemText: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary },
  menuItemArrow: { },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error + '15',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.error + '33',
    marginTop: Spacing.md,
  },
  logoutBtnText: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.error,
  },

  version: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
