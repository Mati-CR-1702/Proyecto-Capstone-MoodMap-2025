import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { exercises } from '../data/exercises';
import { Exercise } from '../types/exercise';
import { styles } from '../styles/exerciseStyles';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseModal from '../components/ExerciseModal';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const categories = ['ira', 'estrés', 'tristeza', 'ansiedad'];

const ExercisesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const navigation = useNavigation();

  const filteredExercises = selectedCategory
    ? exercises.filter((e) => e.category === selectedCategory)
    : exercises;
  const categoryIcons: Record<string, { icon: string; color: string }> = {
    ira: { icon: 'flame', color: '#FF5252' },        
    'estrés': { icon: 'alert-circle', color: '#E7B58F' }, 
    tristeza: { icon: 'rainy', color: '#4B4B4B' },   
    ansiedad: { icon: 'cloud-outline', color: '#A084E8' }, 
  };
  return (

    <View style={styles.container}>
      {/* Header con botón de retroceso */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="#2D2D2D" />
        </TouchableOpacity>

        <Text style={styles.header}>Ejercicios emocionales</Text>

        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ExerciseCard exercise={item} onPress={() => setSelectedExercise(item)} />
        )}
      />

      <ExerciseModal
        visible={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
        exercise={selectedExercise}
      />

      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por emoción</Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.modalItem,
                  selectedCategory === cat && styles.modalItemActive,
                  { flexDirection: 'row', alignItems: 'center' }
                ]}
                onPress={() => {
                  setSelectedCategory(cat === selectedCategory ? null : cat);
                  setFilterModalVisible(false);
                }}
              >
                <Ionicons
                  name={categoryIcons[cat].icon as any}
                  size={22}
                  color={categoryIcons[cat].color}
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.modalItemText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ExercisesScreen;