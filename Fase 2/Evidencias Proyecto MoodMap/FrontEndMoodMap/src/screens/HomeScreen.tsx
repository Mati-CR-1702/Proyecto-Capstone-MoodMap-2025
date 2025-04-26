// HomeScreen.tsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/homeStyles';

const API_URL = 'http://localhost:9001';

interface User {
  username: string;
  // Puedes agregar más propiedades si quieres
}

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext); // usamos el logout del contexto

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get<User[]>(`${API_URL}/users`, { 
          headers: {
            Authorization:`Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios:</Text>
      {users.map((user, index) => (
        <Text key={index} style={styles.userText}>{user.username}</Text>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}