import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordScreenProps } from '../types/react-navigation.d';
import axios from 'axios';
import { styles } from '../styles/forgotPasswordStyles';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';


const API_URL = 'http://localhost:9001';

export default function ForgotPasswordScreen() {
  const [username, setUsername] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [secretQuestion, setSecretQuestion] = useState('');
  const navigation = useNavigation<ForgotPasswordScreenProps['navigation']>();

  const handleCheckUser = async () => {
    if (!username) {
      Alert.alert('Error', 'Por favor ingresa tu nombre de usuario');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/secret-question`, {
        params: { username }
      });
      setSecretQuestion(response.data.secretQuestion);
      setStep(2);
    } catch (error) {
      Alert.alert('Error', 'Usuario no encontrado');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!secretAnswer) {
      Alert.alert('Error', 'Por favor ingresa la respuesta secreta');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        username,
        secretAnswer,
        newPassword
      });
      Alert.alert('Éxito', 'Contraseña actualizada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <Text style={styles.title}>MOODMAP</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recuperar Contraseña</Text>

        {step === 1 && (
          <>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleCheckUser}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Continuar</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.secretQuestion}>{secretQuestion}</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="help-outline" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Respuesta secreta"
                value={secretAnswer}
                onChangeText={setSecretAnswer}
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Actualizar Contraseña</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* Botón volver */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
