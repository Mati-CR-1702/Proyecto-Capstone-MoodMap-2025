import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { stylesAjustes } from '../styles/ajusteStyles';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedCard from '../components/AnimatedCard';

const AjusteScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    Alert.alert(
      '¿Estás seguro?',
      'Esta acción eliminará tu cuenta permanentemente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              await api.delete('/user/profile', {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              await logout();
              Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido borrada exitosamente');
            } catch (error) {
              console.error('Error al eliminar cuenta:', error);
              Alert.alert('Error', 'No se pudo eliminar la cuenta');
            }
          }
        }
      ]
    );
  };

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
        {/* Modificar Perfil */}
        <AnimatedCard
          style={stylesAjustes.card}
          onPress={() => navigation.navigate('UpdateProfile')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person-circle-outline" size={26} color="#E7B58F" style={{ marginRight: 12 }} />
            <Text style={stylesAjustes.cardText}>Modificar Perfil</Text>
          </View>
        </AnimatedCard>

        {/* Eliminar cuenta */}
        <AnimatedCard
          style={stylesAjustes.card}
          onPress={handleDeleteAccount}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="delete-forever" size={26} color="#FF5252" style={{ marginRight: 12 }} />
            <Text style={stylesAjustes.cardText}>Eliminar Cuenta</Text>
          </View>
        </AnimatedCard>

        {/* Cerrar Sesión */}
        <AnimatedCard
          style={stylesAjustes.card}
          onPress={logout}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="log-out-outline" size={26} color="#E7B58F" style={{ marginRight: 12 }} />
            <Text style={stylesAjustes.cardText}>Cerrar Sesión</Text>
          </View>
        </AnimatedCard>
      </View>
    </View>
  );
};

export default AjusteScreen;