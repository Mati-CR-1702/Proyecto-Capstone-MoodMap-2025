// services/profileService.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:9001';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
}

export const getUserProfile = async (): Promise<UserProfileData> => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get<UserProfileData>(`${API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserProfile = async (data: UserProfileData): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  await axios.put(`${API_URL}/user/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};