import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { styles } from '../styles/registerStyles';
import { register as registerUser } from '../services/authService';
import { RegisterScreenProps } from '../types/react-navigation.d';
import { Ionicons } from '@expo/vector-icons';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  secretQuestion: string;
  secretAnswer: string;
}

type FormFields = keyof FormData;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      secretQuestion: '',
      secretAnswer: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretAnswer, setShowSecretAnswer] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const fields: { name: FormFields; placeholder: string; secure?: boolean; toggleSecure?: () => void; show?: boolean }[] = [
    { name: 'firstName', placeholder: 'Nombre' },
    { name: 'lastName', placeholder: 'Apellido' },
    { name: 'username', placeholder: 'Correo electrónico' },
    { name: 'password', placeholder: 'Contraseña', secure: true, toggleSecure: () => setShowPassword(!showPassword), show: showPassword },
    { name: 'secretQuestion', placeholder: 'Pregunta secreta (ej. Nombre de tu mascota)' },
    { name: 'secretAnswer', placeholder: 'Respuesta secreta', secure: true, toggleSecure: () => setShowSecretAnswer(!showSecretAnswer), show: showSecretAnswer }
  ];

  return (
      <View style={styles.container}>
      {/* Parte superior */}
      <View style={styles.headerBackground}>
        <Text style={styles.title}>MOODMAP</Text>
      </View>

      {/* Card */}
      <View style={styles.registerCard}>
        <Text style={styles.registerTitle}>Crear Cuenta</Text>

        {fields.map(({ name, placeholder, secure, toggleSecure, show }) => (
          <View key={name}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={24} color="#000" style={styles.icon} />
              <Controller
                control={control}
                name={name}
                rules={{
                  required: `${placeholder} es requerido`,
                  ...(name === 'password' && {
                    minLength: {
                      value: 6,
                      message: 'Mínimo 6 caracteres',
                    }
                  })
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#A0A0A0"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secure && !show}
                    autoCapitalize="none"
                  />
                )}
              />
              {secure && (
                <TouchableOpacity onPress={toggleSecure}>
                  <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>
            {errors[name] && (
              <Text style={styles.errorText}>
                {(errors[name] as FieldError)?.message}
              </Text>
            )}
          </View>
        ))}

        {/* Botón de registro */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        {/* Link para ir al login */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkButton}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View> 
    );
}
