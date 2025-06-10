import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
  },
  headerBackground: {
    height: '30%',
    backgroundColor: '#E7B58F',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  registerCard: {
    backgroundColor: '#FFFBF5',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  inputTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 12,
  },
  registerButton: {
    backgroundColor: '#2D2D2D',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLinkText: {
    color: '#6C6C6C',
    fontSize: 14,
  },
  loginLinkButton: {
    color: '#2D2D2D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  modalItemText: {
    fontSize: 16,
    color: '#000',
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#DDD',
    marginHorizontal: 20,
  },
});
