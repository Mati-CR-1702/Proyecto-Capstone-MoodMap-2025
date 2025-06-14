import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  BackHandler,
  Modal,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { styles } from '../styles/chatStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/authService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const CHAT_ENDPOINT = '/api/chat';

export default function ChatScreen({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const nav = useNavigation();
  const [showExitModal, setShowExitModal] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShowExitModal(true);
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = nav.addListener('beforeRemove', (e) => {
      e.preventDefault();
      setShowExitModal(true);
    });
    return unsubscribe;
  }, [nav]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      if (Platform.OS === 'android') {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      }
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'android') {
        setKeyboardHeight(0);
      }
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
        console.error('Token o userId no encontrado, debes hacer login primero');
        return;
      }
      const response = await api.post(
        CHAT_ENDPOINT,
        {
          userId: parseInt(userId),
          sessionId: sessionId,
          model: 'gpt-4o-mini',
          temperature: 0.7,
          messages: [{ role: 'user', content: newUserMessage.text }],
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
      setIsGenerating(true);
      const token = await AsyncStorage.getItem('token');
      const storedSessionId = await AsyncStorage.getItem('sessionId');

      // Si NO hay mensajes, solo limpia sesión y navega a Home
      if (!messages || messages.length === 0) {
        await AsyncStorage.removeItem('sessionId');
        setSessionId(null);
        setIsGenerating(false);
        navigation.navigate('Home');
        return;
      }

      // Si hay mensajes, genera el reporte como siempre
      if (!token || !storedSessionId) {
        setIsGenerating(false);
        return;
      }
      const sessionId = parseInt(storedSessionId, 10);
      await api.post(
        `${CHAT_ENDPOINT}/cerrar-sesion/${sessionId}`,
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
      setIsGenerating(false);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al cerrar la sesión del chat:', error);
      setIsGenerating(false);
    }
  };

  const ExitModal = () => (
    <Modal
      visible={showExitModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowExitModal(false)}
    >
      <View style={styles.loadingOverlay}>
        <View style={[styles.loadingBox, { width: 320 }]}>
          {/* Botón X de cierre arriba a la derecha */}
          <TouchableOpacity
            onPress={() => setShowExitModal(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              padding: 6,
              borderRadius: 16,
              backgroundColor: '#FFEBEB',
            }}
          >
            <Ionicons name="close" size={28} color="#FF5252" />
          </TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={48} color="#FF5252" style={{ marginBottom: 10, marginTop: 18 }} />
          <Text style={[styles.title, { fontSize: 20, marginBottom: 8 }]}>¿Deseas generar un reporte?</Text>
          <Text style={[styles.loadingText, { color: '#666', marginBottom: 18 }]}>
            Puedes guardar esta conversación antes de salir.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#FFEBEB',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                marginRight: 6,
              }}
              onPress={() => {
                setShowExitModal(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={{ color: '#FF5252', fontWeight: 'bold' }}>Volver al Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#E7B58F',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                marginLeft: 6,
              }}
              onPress={async () => {
                setShowExitModal(false);
                await endChatSession();
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sí, generar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FDF7F2' }}>
        {/* Header y estado */}
        <View style={{ height: 18 }} />
        <View style={styles.headerChat}>
          <Text style={styles.titleChat}>Chat Clara</Text>
          <TouchableOpacity style={styles.endChatButton} onPress={endChatSession}>
            <Ionicons name="exit-outline" size={30} color="#FF5252" />
          </TouchableOpacity>
        </View>
        <View style={styles.onlineStatusWrapper}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>En línea</Text>
        </View>

        {/* Advertencia */}
        <View style={styles.warningBox}>
          <Ionicons name="alert-circle-outline" size={20} color="#E7B58F" style={{ marginRight: 6 }} />
          <Text style={styles.warningText}>
            Esta IA no reemplaza la atención de un profesional de la salud mental. Es solo un complemento, no una terapia profesional.
          </Text>
        </View>

        {/* Lista de mensajes */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.sender === 'user' ? styles.userBubble : styles.botBubble
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>
                {item.sender === 'user' ? 'Tú' : 'Bot'} {item.timestamp}
              </Text>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1, ...styles.messagesContainer }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
        />

        {/* Input bar con padding dinámico en Android */}
        <View style={[
          styles.inputBar,
          Platform.OS === 'android' && { paddingBottom: keyboardHeight }
        ]}>
          <TextInput
            style={styles.inputField}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#A0A0A0"
            value={inputText}
            onChangeText={setInputText}
            onFocus={() => setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200)}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Modals */}
        {isGenerating && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#2D2D2D" />
              <Text style={styles.loadingText}>
                {messages.length === 0
                  ? 'Cerrando sesión...'
                  : 'Generando reporte...'}
              </Text>
            </View>
          </View>
        )}

        <ExitModal />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
