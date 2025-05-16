// src/styles/ExerciseCardStyles.ts
import { StyleSheet } from 'react-native';

const ExerciseCardStyles = StyleSheet.create({
  card: {
    width: '47%',
    marginBottom: 16,
    backgroundColor: '#F9F1ED',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#6B6B6B',
    textAlign: 'center',
  },
});

export default ExerciseCardStyles;
