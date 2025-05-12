import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/ExerciseModalStyles';
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
          <Text style={styles.modalTitle}>{exercise.title}</Text>
          <Image source={exercise.image || require('../../assets/placeholder.png')} style={styles.modalImage} />
          <Text style={styles.modalDescription}>{exercise.fullDescription}</Text>
          <Text style={styles.modalCategory}>Categoría: {exercise.category}</Text>
          <Image source={exercise.gif} style={styles.modalGif} />
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModal;
