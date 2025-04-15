import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.13:9001'; // Asegúrate que coincida con tu backend

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export const register = async (user: UserData) => {
  try {
    console.log(' Intentando registrar:', user);
    
    const response = await axios.post(`${API_URL}/register`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(' Usuario registrado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(' Error en register:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const login = async (username: string, password: string) => {
  try {
    console.log(' Haciendo login con:', username, password);
    const response = await axios.post(`${API_URL}/login`, { username, password });
    console.log(' Respuesta del backend:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(' Error en login:', error.message);
    throw new Error(error.response?.data?.message || 'Error en el login');
  }
};
