import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2D2D2D',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFBF5',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 6,
  },
  cardDate: {
    fontSize: 12,
    color: '#6C6C6C',
    marginBottom: 6,
  },
  cardPreview: {
    fontSize: 14,
    color: '#444',
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalBox: {
  backgroundColor: '#FFF',
  padding: 25,
  borderRadius: 20,
  width: '85%',
  maxHeight: '80%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#2D2D2D',
},
modalContent: {
  fontSize: 16,
  color: '#333',
  marginBottom: 20,
},
modalButton: {
  backgroundColor: '#E7B58F',
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: 'center',
},
modalButtonText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 16,
},
backButton: {
  backgroundColor: '#E7B58F',
  margin: 20,
  paddingVertical: 14,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
backButtonText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 16,
},

backIcon: {
  position: 'absolute',
  top: 50,
  left: 20,
  zIndex: 10,
},


});
