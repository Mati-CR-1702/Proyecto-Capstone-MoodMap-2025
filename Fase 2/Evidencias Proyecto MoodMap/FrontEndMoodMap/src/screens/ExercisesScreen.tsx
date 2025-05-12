import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { exercises } from '../data/exercises';
import { Exercise } from '../types/exercise';
import { styles } from '../styles/exerciseStyles';

const categories = ['ira', 'estrés', 'tristeza', 'ansiedad', 'felicidad'];

const ExercisesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = selectedCategory
    ? exercises.filter(e => e.category === selectedCategory)
    : exercises;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tipos de ejercicios</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive
            ]}
            onPress={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedExercise(item)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.shortDescription}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!selectedExercise}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedExercise(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedExercise && (
              <>
                <Text style={styles.modalTitle}>{selectedExercise.title}</Text>
                <Text style={styles.modalCategory}>Categoría: {selectedExercise.category}</Text>
                <Image source={selectedExercise.gif} style={styles.modalGif} />
                <Text style={styles.modalDescription}>
                  {selectedExercise.fullDescription}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedExercise(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExercisesScreen;
