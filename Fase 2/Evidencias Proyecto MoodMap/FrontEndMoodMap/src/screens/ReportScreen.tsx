import React, { useState, useEffect } from 'react';
import {View,Text,ScrollView,TouchableOpacity,ActivityIndicator,SafeAreaView,StyleSheet,Share} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  summary?: string;
  keyPoints?: string[];
}

const API_URL = 'http://192.168.0.9:9001/api/summarize';

export default function ReportScreen({ navigation }: any) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const savedConversations = await AsyncStorage.getItem('conversations');
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      }
    } catch (error) {
      console.error('Error al cargar conversaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async (conversation: Conversation) => {
    setGeneratingSummary(true);
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        console.error("Token no encontrado, debes hacer login primero");
        return;
      }

      const messagesForAPI = conversation.messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      messagesForAPI.push({
        role: 'user',
        content: 'Por favor, genera un resumen conciso de esta conversación, destacando los puntos clave y las conclusiones más importantes en un formato bulleted-list. El resumen debe ser breve pero completo.'
      });

      const response = await axios.post(API_URL,
        {
          model: "gpt-4o-mini",
          messages: messagesForAPI,
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const summaryText = response.data;
      
      const keyPointsMatch = summaryText.match(/[•\-\*]\s+([^\n]+)/g);
      const keyPoints = keyPointsMatch 
        ? keyPointsMatch.map(point => point.replace(/^[•\-\*]\s+/, '').trim())
        : [];

      const updatedConversation = {
        ...conversation,
        summary: summaryText,
        keyPoints: keyPoints
      };

      const updatedConversations = conversations.map(conv => 
        conv.id === conversation.id ? updatedConversation : conv
      );
      
      setConversations(updatedConversations);
      setSelectedConversation(updatedConversation);
      
      await AsyncStorage.setItem('conversations', JSON.stringify(updatedConversations));
      
    } catch (error) {
      console.error('Error al generar resumen:', error);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const shareReport = async () => {
    if (!selectedConversation || !selectedConversation.summary) return;
    
    try {
      const reportText = `
Reporte de Conversación: ${selectedConversation.title}
Fecha: ${selectedConversation.date}

RESUMEN:
${selectedConversation.summary}

PUNTOS CLAVE:
${selectedConversation.keyPoints?.map(point => `• ${point}`).join('\n') || 'No hay puntos clave disponibles.'}
      `;
      
      await Share.share({
        message: reportText,
        title: `Reporte de conversación: ${selectedConversation.title}`
      });
    } catch (error) {
      console.error('Error al compartir reporte:', error);
    }
  };

  const renderConversationsList = () => (
    <ScrollView style={styles.conversationsList}>
      <Text style={styles.sectionTitle}>Conversaciones Recientes</Text>
      
      {conversations.length === 0 ? (
        <Text style={styles.emptyMessage}>No hay conversaciones guardadas</Text>
      ) : (
        conversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => setSelectedConversation(conversation)}
          >
            <Text style={styles.conversationTitle}>{conversation.title}</Text>
            <Text style={styles.conversationDate}>{conversation.date}</Text>
            <Text style={styles.conversationPreview}>
              {conversation.messages.length} mensajes
            </Text>
            <View style={styles.statusContainer}>
              {conversation.summary ? (
                <View style={styles.summaryAvailable}>
                  <Text style={styles.summaryAvailableText}>Resumen disponible</Text>
                </View>
              ) : (
                <View style={styles.noSummary}>
                  <Text style={styles.noSummaryText}>Sin resumen</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color="#2D2D2D" />
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  const renderConversationDetail = () => {
    if (!selectedConversation) return null;
    
    return (
      <ScrollView style={styles.conversationDetail}>
        <View style={styles.detailHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedConversation(null)}
          >
            <Ionicons name="chevron-back" size={20} color="#2D2D2D" />
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
          
          <Text style={styles.detailTitle}>{selectedConversation.title}</Text>
          <Text style={styles.detailDate}>{selectedConversation.date}</Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Resumen</Text>
          
          {selectedConversation.summary ? (
            <>
              <Text style={styles.summaryText}>{selectedConversation.summary}</Text>
              
              {selectedConversation.keyPoints && selectedConversation.keyPoints.length > 0 && (
                <View style={styles.keyPointsContainer}>
                  <Text style={styles.keyPointsTitle}>Puntos Clave:</Text>
                  {selectedConversation.keyPoints.map((point, index) => (
                    <View key={index} style={styles.keyPointItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.keyPointText}>{point}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={shareReport}
              >
                <Ionicons name="share-social-outline" size={20} color="#FFF" />
                <Text style={styles.shareButtonText}>Compartir Reporte</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.generateContainer}>
              <Text style={styles.noSummaryMessage}>
                No hay resumen disponible para esta conversación.
              </Text>
              <TouchableOpacity
                style={styles.generateButton}
                onPress={() => generateSummary(selectedConversation)}
                disabled={generatingSummary}
              >
                {generatingSummary ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="analytics-outline" size={20} color="#FFF" />
                    <Text style={styles.generateButtonText}>Generar Resumen</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.messagesContainer}>
          <Text style={styles.messagesTitle}>Mensajes de la Conversación</Text>
          {selectedConversation.messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageItem,
                message.sender === 'user' ? styles.userMessage : styles.botMessage
              ]}
            >
              <Text style={styles.messageSender}>
                {message.sender === 'user' ? 'Tú' : 'Bot'}
              </Text>
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>{message.timestamp}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.title}>Reportes de Conversaciones</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2D2D2D" style={styles.loader} />
      ) : (
        <View style={styles.content}>
          {!selectedConversation ? renderConversationsList() : renderConversationDetail()}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  content: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationsList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2D2D2D',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 40,
    color: '#757575',
    fontSize: 16,
  },
  conversationItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  conversationDate: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  conversationPreview: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryAvailable: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  summaryAvailableText: {
    color: '#0288D1',
    fontSize: 12,
    fontWeight: '500',
  },
  noSummary: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  noSummaryText: {
    color: '#757575',
    fontSize: 12,
    fontWeight: '500',
  },
  conversationDetail: {
    flex: 1,
    padding: 16,
  },
  detailHeader: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    fontSize: 14,
    color: '#2D2D2D',
    marginLeft: 4,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  detailDate: {
    fontSize: 14,
    color: '#757575',
  },
  summaryContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
    marginBottom: 16,
  },
  keyPointsContainer: {
    marginBottom: 16,
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  keyPointItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#0288D1',
    marginRight: 8,
    width: 10,
  },
  keyPointText: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
    lineHeight: 20,
  },
  shareButton: {
    backgroundColor: '#0288D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  generateContainer: {
    alignItems: 'center',
    padding: 16,
  },
  noSummaryMessage: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#0288D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  generateButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  messagesContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  messageItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#E1F5FE',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  botMessage: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    color: '#0288D1',
  },
  messageText: {
    fontSize: 14,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    color: '#757575',
    alignSelf: 'flex-end',
  },
});