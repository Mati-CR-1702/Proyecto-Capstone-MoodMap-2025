// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Mood {
  id: number;
  name: string;
  face: string;
  color: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  selectedMood: null,
  setSelectedMood: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string, user: any) => {
    if (!token || !user) {
      console.error('Token o usuario inválido:', { token, user });
      return;
    }
  
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    setSelectedMood(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout, selectedMood, setSelectedMood }}>
      {children}
    </AuthContext.Provider>
  );
};