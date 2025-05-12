import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/ExerciseCardStyles';
import { Exercise } from '../types/exercise';

interface Props {
  exercise: Exercise;
  onPress: () => void;
}

const ExerciseCard: React.FC<Props> = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={exercise.image || require('../../assets/placeholder.png')} style={styles.cardImage} />
      <Text style={styles.cardText}>{exercise.title}</Text>
    </TouchableOpacity>
  );
};

export default ExerciseCard;