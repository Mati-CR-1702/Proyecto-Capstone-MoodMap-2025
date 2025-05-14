//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\FrontEndMoodMap\src\screens\HomeScreen.tsx

import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; 
import ScreenWrapper from '../../src/components/ScreenWrapper';
import { RootStackParamList } from 'src/types/react-navigation';
import AnimatedCard from 'src/components/AnimatedCard';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);
  const { selectedMood } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <Text style={styles.Saludo} >Hola, {user?.firstName}👋</Text>
        {/* EMOCION */}
        <TouchableOpacity onPress={() => navigation.navigate('Moodtracker')}>
        {selectedMood && (
          <AnimatedCard onPress={() => navigation.navigate('Moodtracker')}>
            <Text style={styles.Mood}>
              {selectedMood.face}
            </Text>
          </AnimatedCard>
        )}

        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View style={styles.content}>
        <AnimatedCard
          style={[styles.card, styles.cardOrange]}
          onPress={() => navigation.navigate('Reportes')}
        >
          <Text style={styles.cardTitle}>Diario Personal</Text>
          <Ionicons name="leaf-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </AnimatedCard>

        <AnimatedCard
          style={[styles.card, styles.cardGreen]}
          onPress={() => navigation.navigate('ChatAi')}
        >
          <Text style={styles.cardTitle}>Chat Bot</Text>
          <Ionicons name="chatbubbles-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </AnimatedCard>

        <AnimatedCard
          style={[styles.card, styles.cardRed]}
          onPress={() => navigation.navigate('Exercises')}
        >
          <Text style={styles.cardTitle}>Tipos de Ejercicios</Text>
          <Ionicons name="fitness-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </AnimatedCard>

        <AnimatedCard
          style={[styles.card, styles.cardBlue]}
          onPress={() => navigation.navigate('Ajustes')}
        >
          <Text style={styles.cardTitle}>Ajustes</Text>
          <Ionicons name="settings-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </AnimatedCard>
      </View>

      {/* Botón de Cerrar Sesión */}
      <AnimatedCard style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </AnimatedCard>
    </View>
    </ScreenWrapper>
  );
}
