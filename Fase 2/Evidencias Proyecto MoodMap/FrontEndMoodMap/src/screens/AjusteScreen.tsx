import React from 'react';
import { View, Text, TouchableOpacity,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stylesAjustes } from '../styles/ajusteStyles'; 

const AjusteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={stylesAjustes.container}>
      <Text style={stylesAjustes.title}>Ajustes</Text>

      <TouchableOpacity
        style={[stylesAjustes.button, stylesAjustes.buttonPrimary]}
        onPress={() => navigation.navigate('UpdateProfile')}
      >
        <Text style={stylesAjustes.buttonText}>Modificar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[stylesAjustes.button, stylesAjustes.buttonSecondary]}
        onPress={() => alert('Función en desarrollo')}
      >
        <Text style={stylesAjustes.buttonText}>Configuración</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[stylesAjustes.button, stylesAjustes.buttonSecondary]}
        onPress={() => alert('Función en desarrollo')}
      >
        <Text style={stylesAjustes.buttonText}>Modo Oscuro</Text>
      </TouchableOpacity>
      <Pressable
              style={stylesAjustes.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={stylesAjustes.backButtonText}>Volver al inicio</Text>
            </Pressable>
      
    </View>
  );
};

export default AjusteScreen; 