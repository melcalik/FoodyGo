import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Android emulator, localhost is 10.0.2.2. For iOS it's localhost.
// The .NET API runs on port 5044 (HTTP).
const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5044/api' 
  : 'http://localhost:5044/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
