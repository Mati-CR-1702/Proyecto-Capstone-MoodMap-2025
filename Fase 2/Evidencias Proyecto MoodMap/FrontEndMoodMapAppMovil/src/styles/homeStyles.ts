import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Obtén el ancho de la pantalla

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  faceEmoji: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  content: {
    flex: 1,
    paddingTop: 25,

  },
  card: {
    height: 120, // Ajusta la altura del botón
    width: width * 0.9, // Ajusta el ancho al 90% de la pantalla
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    alignSelf: 'center', // Centra los botones horizontalmente
    backgroundColor: '#FFF', // Fondo blanco para evitar problemas de transparencia
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    resizeMode: 'cover', // Asegúrate de que la imagen cubra todo el botón
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    fontFamily: 'sans-serif',
    textAlign: 'left',
    position: 'absolute', 
    top: '40%',           
    left: 20,             
    right: 60,            
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  logoutButton: {
    backgroundColor: 'firebrick',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});