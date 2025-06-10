import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiConfig';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
}

// Instancia global de axios usando la URL base centralizada
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const getUserProfile = async (): Promise<UserProfileData> => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.get<UserProfileData>('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserProfile = async (data: UserProfileData): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  await api.put('/user/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};