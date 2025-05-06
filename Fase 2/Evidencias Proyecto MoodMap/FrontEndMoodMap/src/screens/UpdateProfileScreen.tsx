import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { styles } from '../styles/updateProfileStyles';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getUserProfile, updateUserProfile } from '../services/profileService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    secretQuestion: string;
    secretAnswer: string;
}

export default function UpdateProfileScreen({ navigation }: { navigation: any }) {
    const { control, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormData>({
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
    const [originalData, setOriginalData] = useState<FormData | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setOriginalData(data);
                Object.entries(data).forEach(([key, value]) => {
                    setValue(key as keyof FormData, value || ''); // Asegúrate de que el valor no sea undefined
                });
            } catch (error) {
                console.error('Error al cargar perfil:', error);
                Alert.alert('Error', 'No se pudo cargar tu perfil');
            }
        };

        fetchProfile();
    }, [setValue]);

    const onSubmit = async (data: FormData) => {
        if (!originalData) return;
    
        const noChanges = Object.entries(data).every(([key, value]) => {
            return value === originalData[key as keyof FormData];
        });
    
        if (noChanges) {
            Alert.alert('Sin cambios', 'Debes modificar al menos un campo.');
            return;
        }
    
        try {
            await updateUserProfile(data);
            Alert.alert('Éxito', 'Perfil actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            Alert.alert('Error', 'Hubo un problema al guardar los cambios');
        }
    };

    const fields: {
        name: keyof FormData;
        placeholder: string;
        secure?: boolean;
        toggleSecure?: () => void;
        show?: boolean;
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
        { name: 'secretQuestion', placeholder: 'Pregunta secreta (ej. Nombre de tu mascota)' },
        {
            name: 'secretAnswer',
            placeholder: 'Respuesta secreta',
            secure: true,
            toggleSecure: () => setShowSecretAnswer(!showSecretAnswer),
            show: showSecretAnswer,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerBackground}>
                <Text style={styles.title}>MOODMAP</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.titleCard}>Actualizar Perfil</Text>

                {fields.map(({ name, placeholder, secure, toggleSecure, show }) => (
                    <View key={name}>
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
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="person-outline" size={24} color="#000" style={styles.icon} />
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
                                    {secure && (
                                        <TouchableOpacity onPress={toggleSecure}>
                                            <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        />
                        {errors[name] && (
                            <Text style={styles.errorText}>
                                {(errors[name] as FieldError)?.message}
                            </Text>
                        )}
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Guardar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.backButtonText}>Volver al Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}