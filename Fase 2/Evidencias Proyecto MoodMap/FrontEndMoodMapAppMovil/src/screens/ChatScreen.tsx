import axios from 'axios';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { styles } from '../styles/chatStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const API_URL = 'http://10.0.2.2:9001/api/chat';

export default function ChatScreen({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false); // 🆕 Modal de carga
  const flatListRef = useRef<FlatList>(null);

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
      timestamp: getTimeNow(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setLoadingResponse(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        console.error("Token o userId no encontrado, debes hacer login primero");
        return;
      }

      const response = await axios.post(
        API_URL,
        {
          userId: parseInt(userId),
          sessionId: sessionId,
          model: "gpt-4o-mini",
          temperature: 0.7,
          messages: [
            {
              role: "user",
              content: newUserMessage.text,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { response: botResponseText, sessionId: newSessionId } = response.data;

      if (newSessionId) {
        setSessionId(newSessionId);
        await AsyncStorage.setItem('sessionId', newSessionId.toString());
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponseText,
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

  const endChatSession = async () => {
    try {
      setIsGenerating(true); // Mostrar modal

      const token = await AsyncStorage.getItem('token');
      const storedSessionId = await AsyncStorage.getItem('sessionId');

      if (!token || !storedSessionId) {
        setIsGenerating(false);
        Alert.alert('Error', 'No se encontró el token o la sesión.');
        return;
      }

      const sessionId = parseInt(storedSessionId, 10);

      await axios.post(
        `${API_URL}/cerrar-sesion/${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      await AsyncStorage.removeItem('sessionId');
      setSessionId(null);

      setIsGenerating(false); // Ocultar modal
      navigation.navigate('Home');

    } catch (error) {
      console.error('Error al cerrar la sesión del chat:', error);
      setIsGenerating(false);
      Alert.alert('Error', 'No se pudo cerrar la sesión del chat.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
          <Ionicons name="settings-outline" size={30} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat Bot</Text>
        <TouchableOpacity style={styles.endChatButton} onPress={endChatSession}>
          <Ionicons name="exit-outline" size={30} color="#FF5252" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>En línea</Text>

      {/* Chat */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {item.sender === 'user' ? 'Tú' : 'Bot'} {item.timestamp}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input */}
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

      {/* Modal de carga */}
      {isGenerating && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#2D2D2D" />
            <Text style={styles.loadingText}>Generando reporte...</Text>
          </View>
        </View>
      )}
    </View>
  );
}
