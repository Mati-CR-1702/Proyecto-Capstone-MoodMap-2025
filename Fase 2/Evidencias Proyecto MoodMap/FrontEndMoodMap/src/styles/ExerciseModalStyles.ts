// src/styles/ExerciseModalStyles.ts
import { StyleSheet } from 'react-native';

const ExerciseModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '85%',
    padding: 20,
  },
  scrollContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  modalCategory: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  modalGif: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalClose: {
    backgroundColor: '#E0BBE4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExerciseModalStyles;
