import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración para Android (usar IP local si no es localhost)
const API_URL = 'http://10.0.2.2:9001'; // Para Android Emulator

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const register = async (userData: UserData) => {
  try {
    const response = await api.post('/register', {
      ...userData,
      firstName: String(userData.firstName),
      lastName: String(userData.lastName),
      secretAnswer: String(userData.secretAnswer)
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', {
      username: String(username).trim(),
      password: String(password).trim()
    });

    const responseData = {
      token: String(response.data.token),
      user: {
        id: String(response.data.user?.id || ''),
        username: String(response.data.user?.username || ''),
        firstName: String(response.data.user?.firstName || ''),
        lastName: String(response.data.user?.lastName || '')
      }
    };

    await AsyncStorage.multiSet([
      ['token', responseData.token],
      ['user', JSON.stringify(responseData.user)]
    ]);

    return responseData;
  } catch (error: any) {
    console.error('Login Error:', {
      request: error.request,
      response: error.response?.data
    });
    throw new Error(error.response?.data?.message || 'Error en el login');
  }
};

export const checkAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ? { token } : null;
};