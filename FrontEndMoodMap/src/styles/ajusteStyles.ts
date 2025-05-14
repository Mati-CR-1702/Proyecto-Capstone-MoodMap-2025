//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-gaboRama\FrontEndMoodMap\src\styles\ajusteStyles.ts

import { StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

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
    borderRadius: 5,
    paddingTop: 50,
    margin: -50,
    marginLeft: -20,
    marginRight: -20,
    paddingBottom: 20,
    paddingRight: 65,
    paddingLeft: 65,
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
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    // Sombra para Android
    elevation: 6,
  },
  cardGreen: {
    backgroundColor: '#A6D6A7',
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    
        // Sombra para Android
        elevation: 6,
  },
  cardBlue: {
    backgroundColor: '#B3CCE6',
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    
        // Sombra para Android
        elevation: 6,
  },
  cardRed:{
    backgroundColor: '#EC7670',
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    
        // Sombra para Android
        elevation: 6,
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
  Saludo:{
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
  }  
});
