import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../styles/registerStyles';
import { register as registerUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    try {
      const response = await registerUser(data);
      Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      {['firstName', 'lastName', 'username', 'password'].map((field, idx) => (
        <Controller
          key={field}
          control={control}
          name={field}
          rules={{
            required: `${field} requerido`,
            ...(field === 'password' && { minLength: { value: 6, message: 'Mínimo 6 caracteres' } }),
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={[styles.input, errors[field] && { borderColor: 'red' }]}
                placeholder={field === 'firstName' ? 'Nombre' :
                            field === 'lastName' ? 'Apellido' :
                            field === 'username' ? 'Usuario' : 'Contraseña'}
                value={value}
                onChangeText={onChange}
                secureTextEntry={field === 'password'}
              />
              {errors[field] && <Text style={{ color: 'red' }}>{errors[field]?.message}</Text>}
            </>
          )}
        />
      ))}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
