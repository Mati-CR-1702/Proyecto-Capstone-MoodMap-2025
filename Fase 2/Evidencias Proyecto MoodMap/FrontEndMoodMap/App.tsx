import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import UpdateProfileScreen from 'src/screens/UpdateProfileScreen';
//import ExercisesScreen from './src/screens/ExercisesScreen';
import AjusteScreen from 'src/screens/AjusteScreen';
import ReportScreen from 'src/screens/ReportScreen';
import MoodTrackerScreen from 'src/screens/MoodtrackerScreen';
import { RootStackParamList } from './src/types/react-navigation.d';

const Stack = createStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Moodtracker">
      <Stack.Screen 
        name="Moodtracker" 
        component={MoodTrackerScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ChatAi" 
        component={ChatScreen} 
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="UpdateProfile" 
        component={UpdateProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
          name="Ajustes" 
          component={AjusteScreen} 
          options={{ headerShown: false }} 
        />
      <Stack.Screen 
          name="Reportes" 
          component={ReportScreen} 
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
       
  );
}

function MainNavigator() {
  const { isLoggedIn, isLoading } = React.useContext(AuthContext);

  if (isLoading) { 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}