import React from 'react';
import {
  Modal, View, Text, Image, TouchableOpacity,
  ScrollView, Dimensions
} from 'react-native';
import styles from '../styles/exerciseModalStyles';
import { Exercise } from '../types/exercise';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/react-navigation.d';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
}

const ExerciseModal: React.FC<Props> = ({ visible, onClose, exercise }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  if (!exercise) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* X roja en la esquina superior derecha */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#FFEBEB',
              borderRadius: 20,
              padding: 6,
              zIndex: 2,
            }}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#FF5252" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.modalTitle}>{exercise.title}</Text>
            <Image source={exercise.image} style={styles.modalImage} />
            <Text style={styles.modalCategory}>Categoría: {exercise.category}</Text>
            {exercise.gif && <Image source={exercise.gif} style={styles.modalGif} />}
            <Text style={styles.modalDescription}>{exercise.fullDescription}</Text>

            <TouchableOpacity
              style={styles.modalStartButton}
              onPress={() => {
                onClose();
                navigation.navigate('Guider', { exercise });
              }}
            >
              <Text style={styles.modalStartButtonText}>Comenzar ejercicio</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModal;