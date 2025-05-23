import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  ChatAi:undefined
  UpdateProfile: undefined;
  Exercises: undefined;
  Ajustes: undefined;
  Reportes: undefined;
  Moodtracker: undefined;

};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatAi'>;
export type UpdateProfileProps = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>;
export type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>;
export type AjusteScreenProps = NativeStackScreenProps<RootStackParamList, 'Ajustes'>;
export type ReportScreenProps = NativeStackScreenProps<RootStackParamList, 'Reportes'>;
export type MoodtrackerScreen = NativeStackScreenProps<RootStackParamList, 'Moodtracker'>;


