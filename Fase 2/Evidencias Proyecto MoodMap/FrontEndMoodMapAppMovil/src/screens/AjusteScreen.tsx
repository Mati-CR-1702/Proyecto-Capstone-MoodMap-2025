import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { stylesAjustes } from '../styles/ajusteStyles';
import { logout } from '../navigation/AuthNavigator';

const AjusteScreen = () => {
  const navigation = useNavigation();

  return (
    
    <View style={stylesAjustes.container}>
      {/* Header estilizado */}
      <View style={stylesAjustes.headerBackground}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={stylesAjustes.backIcon}
        >
          <Ionicons name="arrow-back-circle-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={stylesAjustes.headerTitle}>Ajustes</Text>
      </View>

      {/* Cards de Ajustes */}
      <View style={stylesAjustes.cardContainer}>
        <TouchableOpacity
          style={stylesAjustes.card}
          onPress={() => navigation.navigate('UpdateProfile')}
        >
          <Text style={stylesAjustes.cardText}>Modificar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={stylesAjustes.card}
          onPress={() => alert('Función en desarrollo')}
        >
          <Text style={stylesAjustes.cardText}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={stylesAjustes.card}
          onPress={() => alert('Función en desarrollo')}
        >
          <Text style={stylesAjustes.cardText}>Modo Oscuro</Text>
        </TouchableOpacity>
        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={stylesAjustes.logoutButton} onPress={logout}>
          <Text style={stylesAjustes.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AjusteScreen;
