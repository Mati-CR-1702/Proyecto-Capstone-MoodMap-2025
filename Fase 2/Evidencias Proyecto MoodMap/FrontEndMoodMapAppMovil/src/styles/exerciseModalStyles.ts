import { StyleSheet } from 'react-native';

const ExerciseModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E7B58F',
    width: '90%',
    maxHeight: '85%',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 18,
    alignItems: 'center',
    elevation: 8,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#FFF6F0',
  },
  modalCategory: {
    fontSize: 14,
    color: '#E7B58F',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 15,
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 14,
  },
  modalStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalStepText: {
    fontSize: 15,
    color: '#4B4B4B',
    textAlign: 'left',
    marginBottom: 8,
  },
  modalStartButton: {
    backgroundColor: '#E7B58F',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 36,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 2,
  },
  modalStartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default ExerciseModalStyles;