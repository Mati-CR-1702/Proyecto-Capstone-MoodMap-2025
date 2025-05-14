import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import ScreenWrapper from 'src/components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ajusteStyles';
import { modalStyles } from '../styles/modalStyles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AnimatedCard from 'src/components/AnimatedCard';

const AjusteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
  });

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSave = () => {
    console.log('Datos guardados: ', userData);
    setModalVisible(false);
  };

  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back-circle-outline" size={30} color="#2D2D2D" />
          </TouchableOpacity>
          <Text style={styles.title}>Ajustes</Text>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <AnimatedCard style={[styles.card, styles.cardGreen]} onPress={() => setModalVisible(true)}>
            <Text style={styles.cardTitle}>Ajustes de Usuario</Text>
            <Ionicons name="body-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
          </AnimatedCard>

          <AnimatedCard style={[styles.card, styles.cardRed]} onPress={() => {}}>
            <Text style={styles.cardTitle}>Generar reportes</Text>
            <Ionicons name="clipboard-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
          </AnimatedCard>

          <AnimatedCard style={[styles.card, styles.cardBlue]} onPress={() => {}}>
            <Text style={styles.cardTitle}>Modo Oscuro</Text>
            <Ionicons name="contrast-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
          </AnimatedCard>
        </View>

        <AnimatedCard style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </AnimatedCard>

        {/* Botón alternativo para abrir modal (puedes eliminar si no lo usas) */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Editar datos de usuario</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={modalStyles.modalContainer}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>Editar Usuario</Text>

              {Object.keys(userData).map((field) => (
                <TextInput
                  key={field}
                  style={modalStyles.input}
                  placeholder={field.replace(/_/, ' ')}
                  secureTextEntry={field.includes('password') || field.includes('answer')}
                  value={userData[field as keyof typeof userData]}
                  onChangeText={(text) => handleChange(field, text)}
                />
              ))}

              <View style={modalStyles.buttonRow}>
                <TouchableOpacity onPress={handleSave} style={modalStyles.saveButton}>
                  <Text style={modalStyles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={modalStyles.cancelButton}>
                  <Text style={modalStyles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default AjusteScreen;
