import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import { styles } from '../styles/loginStyles';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../src/components/ScreenWrapper';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleLogin = async () => {
    const { username, password } = getValues();

    setLoading(true);
    try {
      const response = await loginService(username, password);
      await login(response.token, response.user);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
    } catch (error: any) {
      if (error.message?.includes('403') || error.message?.toLowerCase().includes('usuario')) {
        Alert.alert('Credenciales inválidas', 'Usuario o contraseña incorrectos');
      } else {
        Alert.alert('Error', error.message || 'Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Parte superior */}
        <View style={styles.headerBackground}>
          <Text style={styles.title}>MOODMAP</Text>
        </View>

        {/* Card de Login */}
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Login</Text>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={24} color="#000" style={styles.icon} />
            <Controller
              control={control}
              name="username"
              rules={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Correo no válido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  value={value ?? ''}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="#A0A0A0"
                />
              )}
            />
          </View>
          {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

          {/* Contraseña */}
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color="#000" style={styles.icon} />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={value ?? ''}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#A0A0A0"
                />
              )}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          {/* Olvidaste tu contraseña */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Botón Iniciar Sesión */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(handleLogin)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          {/* Registro */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

