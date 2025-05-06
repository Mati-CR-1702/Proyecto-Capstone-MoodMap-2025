import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import ScreenWrapper from 'src/components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/homeStyles';
import { modalStyles } from '../styles/modalStyles';
import { useContext } from 'react'

//funciones externas
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Importante: importamos el contexto



const AjusteScreen = () => {



  //funciones modal
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
  const { logout } = useContext(AuthContext); // Agarramos logout del contexto
  

  return (
    <View style={stylesAjustes.container}>
    <ScreenWrapper>
      <Text style={stylesAjustes.title}>Ajustes</Text>

      <View style={styles.content}>
      <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.cardTitle}>Ajustes de Usuario</Text>
          <Ionicons name="body-outline" size={40} color="#ffffff99" style={styles.cardIcon}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          onPress={() => {}}
        >
            
          <Text style={styles.cardTitle}>Generar reportes</Text>
          <Ionicons name="clipboard-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>

      <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          onPress={() => {}}
        >
          <Text style={styles.cardTitle}>Modo Oscuro</Text>
          <Ionicons name="contrast-outline" size={40} color="#ffffff99" style={styles.cardIcon} />
        </TouchableOpacity>
      </View>  

      {/* Botón de Cerrar Sesión */}
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

    {/* Botón que abre el modal */}
    <TouchableOpacity onPress={() => setModalVisible (true)}>
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
            placeholder={field.replace(/_/g, ' ')}
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

</ScreenWrapper>
</View>
  );
};

export default AjusteScreen;

const stylesAjustes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',     // centra horizontalmente
    backgroundColor: '#fff',  // color de fondo blanco
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
