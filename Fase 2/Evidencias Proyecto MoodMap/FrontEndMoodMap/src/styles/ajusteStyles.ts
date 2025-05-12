import { StyleSheet } from 'react-native';

export const stylesAjustes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F0', // Fondo similar a otras pantallas
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonPrimary: {
    backgroundColor: '#E0BBE4',
  },
  buttonSecondary: {
    backgroundColor: '#EEE',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B4B4B',
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
});