import { StyleSheet } from 'react-native';

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
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  card: {
    height: 120,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardOrange: {
    backgroundColor: '#E7B58F',
  },
  cardGreen: {
    backgroundColor: '#A6D6A7',
  },
  cardBlue: {
    backgroundColor: '#B3CCE6',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D2D2D',
    fontFamily: 'sans-serif',
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  logoutButton: {
    backgroundColor: '#FF5252',
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
