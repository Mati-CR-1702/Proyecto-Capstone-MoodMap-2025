import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/homeStyles';
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
            <Image
              source={selectedMood.image}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Moodtracker')}>
            <Image
              source={require('../../assets/emoji 3.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Cards sin imágenes */}
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Reportes')}
        >
          <ImageBackground
            source={require('../../assets/fondo1.png')}
            style={styles.cardBackground}
            imageStyle={styles.cardImage}
          >
            <Text style={styles.cardTitle}>Diario Personal</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChatAi')}
        >
          <ImageBackground
            source={require('../../assets/fondo2.png')}
            style={styles.cardBackground}
            imageStyle={styles.cardImage}
          >
            <Text style={styles.cardTitle}>Chat Clara</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Exercises')}
        >
          <ImageBackground
            source={require('../../assets/fondo3.png')}
            style={styles.cardBackground}
            imageStyle={styles.cardImage}
          >
            <Text style={styles.cardTitle}>Tipos de Ejercicios</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
    </View>
  );
}