import { StyleSheet } from 'react-native';

const ExerciseCardStyles = StyleSheet.create({
  card: {
    width: '47%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#FCE5CD', // cambia según categoría si lo deseas
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
  },
});

export default ExerciseCardStyles;