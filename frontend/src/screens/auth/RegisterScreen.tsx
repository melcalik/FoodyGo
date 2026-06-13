import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AuthStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { isValidEmail, isValidPassword } from '../../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError(t('auth.fillAllFields'));
      return false;
    }
    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return false;
    }
    if (!isValidEmail(email)) {
      setError(t('auth.invalidEmail'));
      return false;
    }
    if (!isValidPassword(password)) {
      setError(t('auth.invalidPassword'));
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setError('');
    const success = await register(name, email, password);
    if (!success) {
      setError(useAuthStore.getState().error || t('auth.registerFailed'));
    }
  };

  const fields = [
    {
      label: t('auth.fullName'),
      value: name,
      setter: setName,
      placeholder: t('auth.namePlaceholder'),
      icon: '👤',
      secure: false,
      keyboardType: 'default' as const,
    },
    {
      label: t('auth.email'),
      value: email,
      setter: setEmail,
      placeholder: t('auth.emailPlaceholder'),
      icon: '✉️',
      secure: false,
      keyboardType: 'email-address' as const,
    },
    {
      label: t('auth.password'),
      value: password,
      setter: setPassword,
      placeholder: t('auth.passwordPlaceholder'),
      icon: '🔒',
      secure: true,
      keyboardType: 'default' as const,
    },
    {
      label: t('auth.confirmPassword'),
      value: confirmPassword,
      setter: setConfirmPassword,
      placeholder: t('auth.passwordPlaceholder'),
      icon: '🔒',
      secure: true,
      keyboardType: 'default' as const,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('auth.register')}</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🌱</Text>
          <Text style={styles.heroTitle}>{t('auth.joinUs')}</Text>
          <Text style={styles.heroSub}>
            {t('auth.joinSubtitle')}
          </Text>
        </View>

        <View style={styles.card}>
          {fields.map(field => (
            <View key={field.label} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>{field.icon}</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.setter}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={field.secure}
                  keyboardType={field.keyboardType}
                  autoCapitalize={field.keyboardType === 'email-address' ? 'none' : 'words'}
                />
              </View>
            </View>
          ))}

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.primaryBtnText}>{t('auth.register')}</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.terms}>
            {t('auth.termsText')}{' '}
            <Text style={styles.termsLink}>{t('auth.termsLink')}</Text>
            {' '}{t('auth.andText')}{' '}
            <Text style={styles.termsLink}>{t('auth.privacyLink')}</Text>
            {t('auth.termsAccept')}
          </Text>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>{t('auth.hasAccount')} </Text>
            <Text style={styles.linkAccent}>{t('auth.login')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  backIcon: { fontSize: 20, color: Colors.textPrimary },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },

  inputGroup: { marginBottom: Spacing.md },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: {
    flex: 1,
    height: 48,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
  },

  errorText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    marginBottom: Spacing.sm,
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnDisabled: { opacity: 0.7 },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },

  terms: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },
  termsLink: { color: Colors.primary },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  linkText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  linkAccent: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
});
