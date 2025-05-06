//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\FrontEndMoodMap\src\screens\ChatScreen.tsx

import axios from 'axios';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from '../styles/chatStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../../src/components/ScreenWrapper';


interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const API_URL = 'http://localhost:9001/api/chat'; // //cambiar a ip local en caso de pruebas de smartphone

export default function ChatScreen({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Mueve la función getTimeNow aquí
  const getTimeNow = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} am`;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: getTimeNow(), // Ahora no hay problema al usar getTimeNow
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setLoadingResponse(true);

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('TOKEN:', token);

      if (!token) {
        console.error("Token no encontrado, debes hacer login primero");
        return;
      }

      console.log("TOKEN ENVIADO:", token);

      const response = await axios.post(API_URL,
        {
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: newUserMessage.text,
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Respuesta completa del backend:', response.data);

      const botResponseText = response.data;

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponseText || 'Lo siento, no entendí eso.',
        sender: 'bot',
        timestamp: getTimeNow(),
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorBotMessage: Message = {
        id: Date.now() + 2,
        text: 'Hubo un problema al contactar al servidor.',
        sender: 'bot',
        timestamp: getTimeNow(),
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setLoadingResponse(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 300);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {item.sender === 'user' ? 'Tú' : 'Bot'} {item.timestamp}
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
          <Ionicons name="settings-outline" size={30} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat Bot</Text>
        <TouchableOpacity>
          <Text style={styles.faceEmoji}>😆</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>En línea</Text>

      {/* Lista de Mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Loading mientras espera respuesta */}
      {loadingResponse && (
        <View style={[styles.messageBubble, styles.botBubble]}>
          <Text style={styles.messageText}>...</Text>
          <Text style={styles.timestamp}>Bot {getTimeNow()}</Text>
        </View>
      )}

      {/* Input de mensaje */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#A0A0A0"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send-outline" size={24} color="#2D2D2D" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    </ScreenWrapper>
  );
}
