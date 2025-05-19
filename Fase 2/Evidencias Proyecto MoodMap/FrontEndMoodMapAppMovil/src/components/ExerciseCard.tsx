import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/exerciseCardStyles';
import { Exercise } from '../types/exercise';

interface Props {
  exercise: Exercise;
  onPress: () => void;
}

const ExerciseCard: React.FC<Props> = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={exercise.image}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>{exercise.title}</Text>
      <Text style={styles.cardDesc}>{exercise.description}</Text>
    </TouchableOpacity>
  );
};

export default ExerciseCard;