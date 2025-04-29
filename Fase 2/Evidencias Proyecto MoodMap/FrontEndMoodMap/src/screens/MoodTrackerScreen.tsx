import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Tipos para los estados de ánimo
interface Mood {
  id: number;
  name: string;
  face: string;
  color: string;
}

// Componente principal
const MoodTrackerScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
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
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#2D2D2D" />
        </TouchableOpacity>
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

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6EF', padding: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
  },
  selectedEmoji: {
    fontSize: 30,
    marginRight: 5,
  },
  greeting: { fontSize: 18, color: '#2D2D2D' },
  question: { fontSize: 24, fontWeight: 'bold', color: '#2D2D2D', marginTop: 5 },
  moodGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20,
  },
  moodItem: {
    width: '30%', aspectRatio: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15,
  },
  moodFace: { fontSize: 30, marginBottom: 5 },
  moodName: { fontSize: 14, fontWeight: '500', color: '#2D2D2D' },
  calendar: { flexDirection: 'row', marginTop: 30 },
  dayContainer: { alignItems: 'center', marginHorizontal: 8 },
  dayCircle: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0',
  },
  today: {
    backgroundColor: '#FFD166',
  },
  dayText: { fontSize: 16, fontWeight: '600' },
  weekdayText: { fontSize: 12, color: '#888', textAlign: 'center', marginTop: 5 },
});

export default MoodTrackerScreen;
