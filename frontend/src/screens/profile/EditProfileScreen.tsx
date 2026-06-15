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
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { EditProfileScreenStyles as styles } from '../../styles/screenStyles';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Eksik Bilgi', t('auth.fillAllFields'));
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Geçersiz E-posta', t('auth.invalidEmail'));
      return;
    }

    if (password) {
      if (!isValidPassword(password)) {
        Alert.alert('Geçersiz Şifre', t('auth.invalidPassword'));
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Şifre Uyuşmazlığı', t('auth.passwordMismatch'));
        return;
      }
    }

    setIsProcessing(true);
    const success = await updateProfile(name, email, password || undefined);
    setIsProcessing(false);

    if (success) {
      Alert.alert(t('common.great'), t('profile.updateSuccess'), [
        { text: t('common.done'), onPress: () => navigation.goBack() }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('profile.editProfile')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.form}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('auth.fullName')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('auth.namePlaceholder')}
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('auth.email')}</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder={t('auth.emailPlaceholder')}
                placeholderTextColor={Colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('profile.newPassword')}</Text>
              <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', padding: 0 }]}>
                <TextInput
                  style={{ flex: 1, padding: Spacing.md, color: Colors.textPrimary }}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('profile.newPasswordPlaceholder')}
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 15 }}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('profile.confirmNewPassword')}</Text>
              <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', padding: 0 }]}>
                <TextInput
                  style={{ flex: 1, padding: Spacing.md, color: Colors.textPrimary }}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder={t('profile.newPasswordPlaceholder')}
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ paddingHorizontal: 15 }}>
                  <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveBtn, isProcessing && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={isProcessing}
            activeOpacity={0.85}
          >
            {isProcessing ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.saveBtnText}>{t('common.save')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

