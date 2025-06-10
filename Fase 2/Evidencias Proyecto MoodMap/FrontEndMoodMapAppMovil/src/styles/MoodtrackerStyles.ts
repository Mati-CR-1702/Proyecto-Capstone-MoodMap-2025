import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  selectedEmoji: {
    fontSize: 48,
  },
  greeting: {
    fontSize: 22,
    color: '#2D2D2D',
    marginTop: 20,
    marginBottom: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center', // centra verticalmente
    paddingTop: 20,           // puedes ajustar este valor
    paddingBottom: 10,        // para separar del calendario
  },
  greetingBold: {
    fontWeight: 'bold',
    color: '#2D2D2D',
    // fontFamily: 'Poppins-Bold', // si tienes la fuente custom
  },
  question: {
    fontSize: 18,
    color: '#2D2D2D',
    marginBottom: 15,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 15,
  width: '30%', // <-- Esto fuerza 3 por fila
  // marginHorizontal: 8, // Puedes ajustar o quitar esto si quieres menos espacio lateral
},

  moodFace: {
    fontSize: 28,
  },
  moodName: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6E6EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    backgroundColor: '#E7B58F',
  },
  dayText: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  weekdayText: {
    fontSize: 14,
    color: '#4B4B4B',
    marginTop: 4,
  },
  calendarWrapper: {
    paddingVertical: 12,
    backgroundColor: '#FFF6F0',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#E7B58F',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    marginBottom: 16, // <-- sube el calendario
    marginTop: 300,     // <-- puedes ajustar si quieres más separación
  },
});
