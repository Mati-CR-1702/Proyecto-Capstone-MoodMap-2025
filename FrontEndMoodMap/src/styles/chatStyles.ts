import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 20,
    paddingTop: 50,
    marginTop: -50,
    backgroundColor: '#F4E9E2',
    
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    // Sombra para Android
    elevation: 6,
  },
  faceEmoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#2D2D2D',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 4,
    color: '#A0A0A0',
    fontSize: 14,
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#E7B58F',
  },
  messageText: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  timestamp: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFBF5',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#2D2D2D',
  },
  Mood:{
    fontSize: 20, 
    marginTop: 10,
    borderBlockColor: 'black',
    borderRadius: 50, 
    padding: 5,
    backgroundColor:'white',

    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    // Sombra para Android
    elevation: 6,
  },
});
