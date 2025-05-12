//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\FrontEndMoodMap\src\screens\HomeScreen.tsx

import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; 
import ScreenWrapper from '../../src/components/ScreenWrapper';
import { RootStackParamList } from 'src/types/react-navigation';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);
  const { selectedMood } = useContext(AuthContext);


  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* EMOCION */}
        <TouchableOpacity onPress={() => navigation.navigate('Moodtracker')}>
        {selectedMood && (
          <TouchableOpacity onPress={() => navigation.navigate('Moodtracker')}>
            <Text style={{ fontSize: 18, marginTop: 10 }}>
              {selectedMood.face} {selectedMood.name}
            </Text>
          </TouchableOpacity>
        )}

        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.card, styles.cardOrange]}
          onPress={() => navigation.navigate('Ajustes')}
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
          onPress={() => navigation.navigate('Ajustes')}
        >
          <Text style={styles.cardTitle}>Tipos de Ejercicios</Text>
          <Ionicons name="fitness-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardBlue]}
          onPress={() => navigation.navigate('Ajustes')}
        >
          <Text style={styles.cardTitle}>Ajustes</Text>
          <Ionicons name="settings-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
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
