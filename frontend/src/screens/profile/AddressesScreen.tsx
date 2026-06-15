import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackParamList } from '../../navigation/types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useAddressStore } from '../../store/useAddressStore';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Addresses'>;

export default function AddressesScreen({ navigation }: Props) {
  const { addresses, fetchAddresses, addAddress, setActiveAddress, deleteAddress, isLoading } = useAddressStore();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async () => {
    if (!title || !city || !district || !addressDetail) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    const success = await addAddress({ title, city, district, addressDetail });
    if (success) {
      setModalVisible(false);
      setTitle('');
      setCity('');
      setDistrict('');
      setAddressDetail('');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={[styles.addressCard, item.isActive && styles.activeCard]} 
      onPress={() => setActiveAddress(item.id)}
    >
      <View style={styles.addressHeader}>
        <View style={styles.titleRow}>
          <Ionicons name="location" size={20} color={item.isActive ? Colors.primary : Colors.textPrimary} />
          <Text style={[styles.addressTitle, item.isActive && styles.activeText]}>{item.title}</Text>
          {item.isActive && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Seçili</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => {
          Alert.alert('Adresi Sil', 'Bu adresi silmek istediğinize emin misiniz?', [
            { text: 'İptal', style: 'cancel' },
            { text: 'Sil', style: 'destructive', onPress: () => deleteAddress(item.id) }
          ]);
        }}>
          <Ionicons name="trash-outline" size={20} color={Colors.error} />
        </TouchableOpacity>
      </View>
      <Text style={styles.addressText}>{item.district}, {item.city}</Text>
      <Text style={styles.addressDetail}>{item.addressDetail}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adreslerim</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading && addresses.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="location-outline" size={60} color={Colors.textMuted} />
              <Text style={styles.emptyText}>Henüz kayıtlı bir adresiniz bulunmuyor.</Text>
            </View>
          }
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={20} color={Colors.white} />
          <Text style={styles.primaryBtnText}>Yeni Adres Ekle</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, padding: 4 }} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>

            <View style={[styles.inputGroup, { marginTop: Spacing.md }]}>
              <Text style={styles.label}>Adres Başlığı</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>🏷️</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ev" placeholderTextColor={Colors.textMuted} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>İl</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>🏙️</Text>
                <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="İstanbul" placeholderTextColor={Colors.textMuted} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>İlçe</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>📍</Text>
                <TextInput style={styles.input} value={district} onChangeText={setDistrict} placeholder="Ataşehir" placeholderTextColor={Colors.textMuted} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Açık Adres</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>🏠</Text>
                <TextInput style={[styles.input, { height: 80, textAlignVertical: 'top' }]} value={addressDetail} onChangeText={setAddressDetail} placeholder="Atatürk Mah. No:2" placeholderTextColor={Colors.textMuted} multiline />
              </View>
            </View>

            <TouchableOpacity style={[styles.primaryBtn, { marginTop: Spacing.md, marginBottom: Spacing.xl }]} activeOpacity={0.85} onPress={handleAddAddress} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.primaryBtnText}>Kaydet</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
  addressCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activeCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  addressTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semiBold, color: Colors.textPrimary },
  activeText: { color: Colors.primary },
  activeBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.xl,
    marginLeft: Spacing.xs,
  },
  activeBadgeText: { color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold },
  addressText: { fontSize: FontSize.sm, color: Colors.textSecondary, marginVertical: 6 },
  addressDetail: { fontSize: FontSize.sm, color: Colors.textMuted },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: Spacing.xl, fontSize: FontSize.md, color: Colors.textMuted },
  footer: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.md, backgroundColor: Colors.background, justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: 48,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    minHeight: '60%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  modalTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary, marginBottom: Spacing.xs, marginTop: Spacing.md },
  inputGroup: { marginBottom: Spacing.md },
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
  primaryBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    borderRadius: Radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
});
