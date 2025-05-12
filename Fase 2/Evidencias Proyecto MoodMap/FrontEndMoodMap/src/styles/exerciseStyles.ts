import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F0',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginBottom: 12,
    textAlign: 'center',
  },
  slider: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#EEE',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  categoryButtonActive: {
    backgroundColor: '#E0BBE4',
  },
  categoryText: {
    color: '#4B4B4B',
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F9F1ED',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B4B4B',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalCategory: {
    fontSize: 14,
    marginBottom: 8,
    color: '#888',
  },
  modalGif: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: '#E0BBE4',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
