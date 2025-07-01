import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/reportStyles';
import { API_URL } from '../services/apiConfig';

interface Report {
  sessionId: number;
  summary: string;
  generatedAt: string;
}

export default function ReportScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        if (!token || !userId) return;

        const response = await axios.get(
          `${API_URL}/api/reportes/usuario/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReports(response.data);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
      }
    };

    fetchReports();
  }, []);

  const renderItem = ({ item }: { item: Report }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedReport(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.cardTitle}>Sesión #{item.sessionId}</Text>
      <Text style={styles.cardDate}>
        Generado: {new Date(item.generatedAt).toLocaleDateString()}
      </Text>
      <Text style={styles.cardPreview} numberOfLines={2}>
        {item.summary}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón de retroceso con ícono */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      >
        <Ionicons name="arrow-back-circle-outline" size={30} />
      </TouchableOpacity>

      <Text style={styles.header}>Bitacora Personal</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.sessionId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* X roja en la esquina superior derecha */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: '#FFEBEB',
                borderRadius: 20,
                padding: 6,
                zIndex: 2,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#FF5252" />
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.modalTitle}>
                 Sesión {selectedReport?.sessionId}
              </Text>
              <Text style={styles.modalContent}>
                {selectedReport?.summary}
              </Text>
            </ScrollView>
            <View style={styles.modalButtonRow}>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}