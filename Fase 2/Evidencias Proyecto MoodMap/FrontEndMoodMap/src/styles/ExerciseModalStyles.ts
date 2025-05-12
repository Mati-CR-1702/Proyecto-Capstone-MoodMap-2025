import { StyleSheet } from 'react-native';

const ExerciseModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  modalGif: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  modalClose: {
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalCloseText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ExerciseModalStyles;
