import { StyleSheet } from 'react-native';

// Estilos
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6EF', padding: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
  },
  selectedEmoji: {
    fontSize: 30,
    marginRight: 5,
  },
  greeting: { fontSize: 18, color: '#2D2D2D' },
  question: { fontSize: 24, fontWeight: 'bold', color: '#2D2D2D', marginTop: 5 },
  moodGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20,
  },
  moodItem: {
    width: '30%', aspectRatio: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15,
  },
  moodFace: { fontSize: 30, marginBottom: 5 },
  moodName: { fontSize: 14, fontWeight: '500', color: '#2D2D2D' },
  calendar: { flexDirection: 'row', marginTop: 30 },
  dayContainer: { alignItems: 'center', marginHorizontal: 8 },
  dayCircle: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0',
  },
  today: {
    backgroundColor: '#FFD166',
  },
  dayText: { fontSize: 16, fontWeight: '600' },
  weekdayText: { fontSize: 12, color: '#888', textAlign: 'center', marginTop: 5 },
});
