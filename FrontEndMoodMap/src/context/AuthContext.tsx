import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Mood {
  id: number;
  name: string;
  face: string;
  color: string;
}

interface User {
  firstName: string;
  lastName: string;
  username: string;
  // puedes agregar más campos si los necesitas
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood | null) => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  selectedMood: null,
  setSelectedMood: () => {},
  user: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (token && storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string, user: User) => {
    if (!token || !user) {
      console.error('Token o usuario inválido:', { token, user });
      return;
    }

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setSelectedMood(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
        selectedMood,
        setSelectedMood,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
