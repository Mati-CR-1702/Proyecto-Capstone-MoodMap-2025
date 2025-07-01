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
  SafeAreaView,
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
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  const renderModal = () => (
    <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <FlatList
                data={secretQuestions}
                keyExtractor={(item) => item}
                ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => onSelectQuestion(item)}>
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

  const renderTermsModal = () => (
    <Modal transparent visible={termsModalVisible} animationType="fade" onRequestClose={() => setTermsModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setTermsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, { padding: 20 }]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                Términos y Condiciones
              </Text>
              <ScrollView style={{ maxHeight: 300 }}>
                <Text style={{ fontSize: 14, color: '#333' }}>
                  En MoodMap, nos comprometemos a respetar y proteger la privacidad de tus datos personales y toda la información que agregues dentro de nuestra app móvil. 
                  Tus datos nunca serán compartidos sin tu consentimiento y serán usados únicamente para brindarte una mejor experiencia personalizada. Al continuar, aceptas estos términos y nuestra política de privacidad.
                </Text>
              </ScrollView>
              <TouchableOpacity style={[styles.registerButton, { marginTop: 20 }]} onPress={() => setTermsModalVisible(false)}>
                <Text style={styles.registerButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

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
            paddingBottom: Platform.OS === 'android' ? keyboardHeight : 0,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.headerBackground}>
              <Text style={styles.title}>MOODMAP</Text>
            </View>

            <View style={[styles.registerCard, Platform.OS === 'android' && keyboardHeight > 0 && { marginBottom: 10 }]}>
              <Text style={styles.registerTitle}>Crear Cuenta</Text>

              {fields.map(({ name, placeholder, secure, toggleSecure, show, isQuestion }) => (
                <View key={name}>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={24} color="#000" style={styles.icon} />
                    {isQuestion ? (
                      <>
                        <TouchableOpacity style={styles.inputTouchable} onPress={() => setModalVisible(true)}>
                          <TextInput
                            style={[styles.input, { color: selectedQuestion ? '#000' : '#A0A0A0' }]}
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
                          ...(name === 'username' && {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Debes ingresar un correo válido',
                            },
                          }),
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
                            blurOnSubmit={false}
                            keyboardType={name === 'username' ? 'email-address' : 'default'}
                          />
                        )}
                      />
                    )}
                    {secure && !isQuestion && (
                      <TouchableOpacity onPress={toggleSecure}>
                        <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
                      </TouchableOpacity>
                    )}
                  </View>
                  {errors[name] && <Text style={styles.errorText}>{(errors[name] as FieldError)?.message}</Text>}
                </View>
              ))}

              {/* Checkbox de términos */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={toggleTermsAccepted} style={{ marginRight: 10 }}>
                  <Ionicons name={termsAccepted ? 'checkbox-outline' : 'square-outline'} size={24} color="#2D2D2D" />
                </TouchableOpacity>
                <Text style={{ color: '#2D2D2D', flex: 1, fontSize: 14 }}>
                  Acepto los{' '}
                  <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }} onPress={() => setTermsModalVisible(true)}>
                    términos y condiciones
                  </Text>
                </Text>
              </View>

              {/* Botón de registro */}
              <TouchableOpacity
                style={[styles.registerButton, { backgroundColor: termsAccepted ? '#2D2D2D' : '#A0A0A0' }]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || !termsAccepted}
              >
                {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>Registrarse</Text>}
              </TouchableOpacity>

              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginLinkText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLinkButton}>Iniciar sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {renderTermsModal()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
