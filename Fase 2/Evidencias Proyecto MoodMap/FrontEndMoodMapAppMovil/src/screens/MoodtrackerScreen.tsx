//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-gaboRama\FrontEndMoodMap\src\screens\MoodtrackerScreen.tsx

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/MoodtrackerStyles';
import ScreenWrapper from '../components/ScreenWrapper';
import { AuthContext } from '../context/AuthContext';

// Tipos para los estados de ánimo
interface Mood {
  id: number;
  name: string;
  face: string;
  color: string;
}

// Componente principal
const MoodTracker: React.FC = () => {
  const navigation = useNavigation();
  const { selectedMood, setSelectedMood } = useContext(AuthContext);
  const [weekDates, setWeekDates] = useState<{ day: number; weekday: string; isToday: boolean }[]>([]);

  // Lista de estados de ánimo
  const moods: Mood[] = [
    { id: 1, name: 'Enojado', face: '😠', color: '#F28B82' },
    { id: 2, name: 'Calmado', face: '😐', color: '#FFD6A5' },
    { id: 3, name: 'Contento', face: '😊', color: '#FDFFB6' },
    { id: 4, name: 'Enamorado', face: '😍', color: '#FFADAD' },
    { id: 5, name: 'Abatido', face: '😔', color: '#E6E6EA' },
    { id: 6, name: 'Con energía', face: '😄', color: '#CAFFBF' },
    { id: 7, name: 'Deprimido', face: '☹️', color: '#D0C4DF' },
    { id: 8, name: 'Triste', face: '😢', color: '#B5D0E6' },
    { id: 9, name: 'Ansioso', face: '😬', color: '#C3E2B5' },
  ];

  // Función para obtener la semana actual desde hoy
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Dom) - 6 (Sáb)
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // domingo

    const days = [...Array(7)].map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        day: date.getDate(),
        weekday: weekdays[date.getDay()],
        isToday: date.toDateString() === today.toDateString(),
      };
    });

    setWeekDates(days);
  }, []);

  // Selección de estado de ánimo
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {selectedMood && (
          <Text style={styles.selectedEmoji}>{selectedMood.face}</Text>
        )}
      </View>

      {/* Saludo */}
      <Text style={styles.greeting}>Hola Usuario Pepe </Text>
      <Text style={styles.question}>¿Cómo te sientes hoy?</Text>

      {/* Estados de ánimo */}
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[styles.moodItem, { backgroundColor: mood.color }]}
            onPress={() => handleMoodSelect(mood)}
          >
            <Text style={styles.moodFace}>{mood.face}</Text>
            <Text style={styles.moodName}>{mood.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendario */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.calendar}>
          {weekDates.map((item, index) => (
            <View key={index} style={styles.dayContainer}>
              <View style={[styles.dayCircle, item.isToday && styles.today]}>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
              <Text style={styles.weekdayText}>{item.weekday}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodTracker;
