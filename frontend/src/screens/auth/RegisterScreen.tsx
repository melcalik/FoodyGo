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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AuthStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { RegisterScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      secure: !showPassword,
      keyboardType: 'default' as const,
      isPassword: true,
      show: showPassword,
      onToggle: () => setShowPassword(!showPassword)
    },
    {
      label: t('auth.confirmPassword'),
      value: confirmPassword,
      setter: setConfirmPassword,
      placeholder: t('auth.passwordPlaceholder'),
      icon: '🔒',
      secure: !showConfirmPassword,
      keyboardType: 'default' as const,
      isPassword: true,
      show: showConfirmPassword,
      onToggle: () => setShowConfirmPassword(!showConfirmPassword)
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
                  style={[styles.input, (field as any).isPassword && { flex: 1 }]}
                  value={field.value}
                  onChangeText={field.setter}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={field.secure}
                  keyboardType={field.keyboardType}
                  autoCapitalize="none"
                />
                {(field as any).isPassword && (
                  <TouchableOpacity onPress={(field as any).onToggle} style={{ padding: 10 }}>
                    <Ionicons name={(field as any).show ? 'eye-off' : 'eye'} size={20} color={Colors.textMuted} />
                  </TouchableOpacity>
                )}
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

