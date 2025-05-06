//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\FrontEndMoodMap\src\screens\HomeScreen.tsx

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; // Importante: importamos el contexto
import ScreenWrapper from '../../src/components/ScreenWrapper';


export default function HomeScreen() {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext); // Agarramos logout del contexto

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Ajustes')}>
          <Ionicons name="settings-outline" size={30} color="#2D2D2D" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.faceEmoji}>😆</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.card, styles.cardOrange]}
          onPress={() => navigation.navigate('PersonalDiary')}
        >
          <Text style={styles.cardTitle}>Diario Personal</Text>
          <Ionicons name="leaf-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          onPress={() => navigation.navigate('ChatAi')}
        >
          <Text style={styles.cardTitle}>Chat Bot</Text>
          <Ionicons name="chatbubbles-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardBlue]}
          onPress={() => navigation.navigate('Exercises')}
        >
          <Text style={styles.cardTitle}>Tipos de Ejercicios</Text>
          <Ionicons name="fitness-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
    </ScreenWrapper>
  );
}
