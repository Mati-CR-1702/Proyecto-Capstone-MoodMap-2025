import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/reportStyles';

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
          `http://localhost:9001/api/reportes/usuario/${userId}`,
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
      <Text style={styles.header}>📝 Reportes Generados</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.sessionId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Volver al inicio</Text>
      </Pressable>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                🗂 Sesión #{selectedReport?.sessionId}
              </Text>
              <Text style={styles.modalContent}>
                {selectedReport?.summary}
              </Text>
            </ScrollView>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}