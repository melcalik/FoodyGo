import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';
import { useNotificationStore } from '../../store/useNotificationStore';

export default function NotificationsScreen({ navigation }: any) {
  const { t } = useTranslation();
  const notifications = useNotificationStore(state => state.notifications);
  const markAsRead = useNotificationStore(state => state.markAsRead);
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead);
  const fetchNotifications = useNotificationStore(state => state.fetchNotifications);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="notifications" size={24} color={item.isRead ? Colors.textMuted : Colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={[styles.title, !item.isRead && styles.unreadText, { flex: 1 }]}>{item.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.orderCode && (
              <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary }}>
                {item.orderCode}
              </Text>
            )}
            {!item.isRead && <View style={[styles.unreadDot, { marginTop: 0 }]} />}
          </View>
        </View>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{new Date(item.createdAt.endsWith('Z') ? item.createdAt : `${item.createdAt}Z`).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <TouchableOpacity onPress={() => markAllAsRead()} style={styles.readAllBtn}>
          <Ionicons name="checkmark-done" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        extraData={notifications}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color={Colors.surfaceBorder} />
            <Text style={styles.emptyText}>Henüz hiç bildiriminiz yok.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  readAllBtn: { padding: 4 },
  listContainer: { padding: Spacing.md, gap: Spacing.md, flexGrow: 1 },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  unreadCard: {
    backgroundColor: Colors.primary + '08',
    borderColor: Colors.primary + '33',
  },
  iconContainer: {
    marginRight: Spacing.md,
    marginTop: 4,
  },
  textContainer: { flex: 1, gap: 4 },
  title: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  unreadText: { color: Colors.primary },
  message: { fontSize: FontSize.sm, color: Colors.textSecondary },
  time: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginLeft: Spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  }
});
