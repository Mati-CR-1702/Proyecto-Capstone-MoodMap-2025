import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/homeStyles';
import ScreenWrapper from '../../src/components/ScreenWrapper';
import { AuthContext } from '../context/AuthContext';
import { RootStackParamList } from '../types/react-navigation';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, selectedMood } = useContext(AuthContext);

  return (
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          {/* Botón de Ajustes */}
          <TouchableOpacity onPress={() => navigation.navigate('Ajustes')}>
            <Ionicons name="settings-outline" size={30} color="#2D2D2D" />
          </TouchableOpacity>

          {/* EMOCIÓN seleccionada */}
          {selectedMood ? (
            <TouchableOpacity onPress={() => navigation.navigate('Moodtracker')}>
              <Text style={styles.faceEmoji}>
                {selectedMood.face} {selectedMood.name}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Moodtracker')}>
              <Text style={styles.faceEmoji}>😆</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cards sin imágenes */}
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Reportes')}
          >
            <Text style={styles.cardTitle}>Diario Personal</Text>
            <Ionicons name="leaf-outline" size={40} color="#2D2D2D" style={styles.cardIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ChatAi')}
          >
            <Text style={styles.cardTitle}>Chat Bot</Text>
            <Ionicons name="chatbubbles-outline" size={40} color="#2D2D2D" style={styles.cardIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Exercises')}
          >
            <Text style={styles.cardTitle}>Tipos de Ejercicios</Text>
            <Ionicons name="leaf-outline" size={40} color="#2D2D2D" style={styles.cardIcon} />
          </TouchableOpacity>
        </View>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
  );
}