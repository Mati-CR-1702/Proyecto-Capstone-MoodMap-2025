import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/exerciseModalStyles';
import { Exercise } from '../types/exercise';

interface Props {
  visible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
}

const ExerciseModal: React.FC<Props> = ({ visible, onClose, exercise }) => {
  if (!exercise) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.modalTitle}>{exercise.title}</Text>
            <Image
              source={exercise.image}
              style={styles.modalImage}
            />
            <Text style={styles.modalCategory}>Categoría: {exercise.category}</Text>
            {exercise.gif && (
              <Image source={exercise.gif} style={styles.modalGif} />
            )}
            <Text style={styles.modalDescription}>{exercise.fullDescription}</Text>
            <TouchableOpacity style={styles.modalClose} onPress={onClose}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModal;