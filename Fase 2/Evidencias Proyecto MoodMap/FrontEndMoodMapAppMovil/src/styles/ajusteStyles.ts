import { StyleSheet } from 'react-native';

export const stylesAjustes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
  },
  headerBackground: {
    height: 160, // Aumentamos un poco
    backgroundColor: '#E7B58F',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 30, // 🔽 Bajamos los botones
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFBF5',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    color: '#2D2D2D',
    fontWeight: '600',
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
