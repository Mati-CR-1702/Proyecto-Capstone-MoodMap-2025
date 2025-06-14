import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  SafeAreaView
} from 'react-native';
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

const secretQuestions = [
  '¿Nombre de tu primera mascota?',
  '¿Nombre de tu escuela primaria?',
  '¿Ciudad donde naciste?',
  '¿Nombre de tu mejor amigo/a de la infancia?',
];

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      secretQuestion: '',
      secretAnswer: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSecretAnswer, setShowSecretAnswer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Manejo del teclado similar al ChatScreen
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      if (Platform.OS === 'android') {
        setKeyboardHeight(e.endCoordinates.height);
      }
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'android') {
        setKeyboardHeight(0);
      }
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const selectedQuestion = watch('secretQuestion');

  const onSelectQuestion = (question: string) => {
    setValue('secretQuestion', question);
    setModalVisible(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const fields: {
    name: FormFields;
    placeholder: string;
    secure?: boolean;
    toggleSecure?: () => void;
    show?: boolean;
    isQuestion?: boolean;
  }[] = [
    { name: 'firstName', placeholder: 'Nombre' },
    { name: 'lastName', placeholder: 'Apellido' },
    { name: 'username', placeholder: 'Correo electrónico' },
    {
      name: 'password',
      placeholder: 'Contraseña',
      secure: true,
      toggleSecure: () => setShowPassword(!showPassword),
      show: showPassword,
    },
    { name: 'secretQuestion', placeholder: 'Pregunta secreta', isQuestion: true },
    {
      name: 'secretAnswer',
      placeholder: 'Respuesta secreta',
      secure: true,
      toggleSecure: () => setShowSecretAnswer(!showSecretAnswer),
      show: showSecretAnswer,
    },
  ];

  const renderModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <FlatList
                data={secretQuestions}
                keyExtractor={(item) => item}
                ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => onSelectQuestion(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDF7F2' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ 
            flexGrow: 1,
            // Agregar padding bottom cuando el teclado está visible en Android
            paddingBottom: Platform.OS === 'android' ? keyboardHeight : 0 
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.headerBackground}>
              <Text style={styles.title}>MOODMAP</Text>
            </View>

            {/* Card */}
            <View style={[
              styles.registerCard,
              // Reducir margin bottom cuando el teclado está visible
              Platform.OS === 'android' && keyboardHeight > 0 && { marginBottom: 10 }
            ]}>
              <Text style={styles.registerTitle}>Crear Cuenta</Text>

              {fields.map(({ name, placeholder, secure, toggleSecure, show, isQuestion }) => (
                <View key={name}>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={24} color="#000" style={styles.icon} />

                    {isQuestion ? (
                      <>
                        <TouchableOpacity
                          style={styles.inputTouchable}
                          onPress={() => setModalVisible(true)}
                        >
                          <TextInput
                            style={[
                              styles.input,
                              { color: selectedQuestion ? '#000' : '#A0A0A0' },
                            ]}
                            placeholder={placeholder}
                            placeholderTextColor="#A0A0A0"
                            value={selectedQuestion}
                            editable={false}
                            pointerEvents="none"
                          />
                          <Ionicons name="chevron-down-outline" size={24} color="#000" />
                        </TouchableOpacity>
                        {renderModal()}
                      </>
                    ) : (
                      <Controller
                        control={control}
                        name={name}
                        rules={{
                          required: `${placeholder} es requerido`,
                          ...(name === 'password' && {
                            minLength: {
                              value: 6,
                              message: 'Mínimo 6 caracteres',
                            },
                          }),
                          ...(name === 'secretAnswer' && {
                            minLength: {
                              value: 1,
                              message: 'Debes responder la pregunta secreta',
                            },
                          }),
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
                            // Evitar que el teclado se cierre automáticamente
                            blurOnSubmit={false}
                          />
                        )}
                      />
                    )}

                    {secure && !isQuestion && (
                      <TouchableOpacity onPress={toggleSecure}>
                        <Ionicons
                          name={show ? 'eye-off-outline' : 'eye-outline'}
                          size={24}
                          color="#000"
                        />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}