import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
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
          onPress={() => navigation.navigate('PersonalDiary')} // Ajusta el nombre si aún no tienes esta screen
        >
          <Text style={styles.cardTitle}>Diario Personal</Text>
          <Ionicons name="leaf-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          onPress={() => navigation.navigate('ChatAi')} // Este nombre debe coincidir con el del Stack.Screen
        >
          <Text style={styles.cardTitle}>Chat Bot</Text>
          <Ionicons name="chatbubbles-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardBlue]}
          onPress={() => navigation.navigate('Exercises')} // Ajusta si no tienes todavía la pantalla de ejercicios
        >
          <Text style={styles.cardTitle}>Tipos de Ejercicios</Text>
          <Ionicons name="fitness-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
