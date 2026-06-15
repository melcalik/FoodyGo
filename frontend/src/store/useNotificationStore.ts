import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import api from '../services/api';

const HUB_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5044/notificationsHub' 
  : 'http://localhost:5044/notificationsHub';

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  orderCode?: string;
  createdAt: string;
}

interface NotificationState {
  notifications: NotificationDto[];
  unreadCount: number;
  connection: signalR.HubConnection | null;
  
  initializeSignalR: () => Promise<void>;
  stopSignalR: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  connection: null,

  initializeSignalR: async () => {
    const { connection } = get();
    if (connection) return;

    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    newConnection.on('ReceiveNotification', (notification: NotificationDto) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));
    });

    try {
      await newConnection.start();
      set({ connection: newConnection });
      get().fetchNotifications();
    } catch (e) {
      console.log('SignalR Connection Error: ', e);
    }
  },

  stopSignalR: async () => {
    const { connection } = get();
    if (connection) {
      await connection.stop();
      set({ connection: null });
    }
  },

  fetchNotifications: async () => {
    try {
      const response = await api.get('/Notifications');
      const data: NotificationDto[] = response.data;
      set({ 
        notifications: data,
        unreadCount: data.filter(n => !n.isRead).length
      });
    } catch (error) {
      console.log('Fetch notifications error: ', error);
    }
  },

  markAsRead: async (id: string) => {
    try {
      await api.put(`/Notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (error) {
      console.log('Mark as read error: ', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await api.put('/Notifications/read-all');
      set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      }));
    } catch (error) {
      console.log('Mark all as read error: ', error);
    }
  }
}));
