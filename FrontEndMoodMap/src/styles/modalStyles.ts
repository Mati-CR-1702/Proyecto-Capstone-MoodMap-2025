import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#00000099',
    },
    modalContent: {
      margin: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      paddingVertical: 8,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
    },
    cancelButton: {
      backgroundColor: '#f44336',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  