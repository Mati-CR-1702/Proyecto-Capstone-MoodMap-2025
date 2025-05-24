import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Mood {
  id: number;
  name: string;
  image: any;
  color: string;
}

interface User {
  id: string; 
  username: string;
  firstName?: string; 
  lastName?: string;

}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: async () => {},
  selectedMood: null,
  setSelectedMood: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [token, userData] = await AsyncStorage.multiGet(['token', 'user']);
        if (token[1] && userData[1]) {
          setIsLoggedIn(true);
          setUser(JSON.parse(userData[1]));
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const login = async (token: string, userData: User) => {
    try {
      const userWithStringId = {
        ...userData,
        id: String(userData.id) // Conversión segura
      };
      await AsyncStorage.multiSet([
        ['token', token],
        ['user', JSON.stringify(userWithStringId)]
      ]);
      setUser(userWithStringId);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
    setIsLoggedIn(false);
    setUser(null);
    setSelectedMood(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        isLoading, 
        user,
        login, 
        logout, 
        selectedMood, 
        setSelectedMood 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};