import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:9001'; //cambiar a ip local en caso de pruebas de smartphone

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const register = async (user: UserData) => {
  try {
    console.log('Intentando registrar:', user);
    
    const response = await axios.post(`${API_URL}/api/auth/register`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    console.log('Usuario registrado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error en register:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

    // Verifica si el token está presente en la respuesta
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);

      // Crea un objeto `user` básico con el username proporcionado
      const user = { id: 'unknown', username };
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { token: response.data.token, user };
    } else {
      throw new Error('Respuesta inválida del servidor: falta el token');
    }
  } catch (error: any) {
    console.error('Error en login:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error en el login');
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }

  
};