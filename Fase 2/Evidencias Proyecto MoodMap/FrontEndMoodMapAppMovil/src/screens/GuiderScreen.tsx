import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  ViewToken,
  Alert,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import NextButton from '../components/NextButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedCard from '../components/AnimatedCard';
import { RootStackParamList } from '../types/react-navigation.d';
import guiderStyles from '../styles/guiderStyles';

type GuiderScreenRouteProp = RouteProp<RootStackParamList, 'Guider'>;

export default function GuiderScreen() {
  const route = useRoute<GuiderScreenRouteProp>();
  const exercise = route.params?.exercise;

  // Usa los pasos del ejercicio recibido, o vacío si no hay
  const [steps, setSteps] = useState(exercise?.steps ?? []);

  // Actualiza los pasos si cambia el ejercicio
  useEffect(() => {
    setSteps(exercise?.steps ?? []);
  }, [exercise]);

  // Temporizador
  const [isWaiting, setIsWaiting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [originalTime, setOriginalTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isWaiting && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsWaiting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isWaiting, timeLeft]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const index = viewableItems[0]?.index;
      if (index !== null && index !== undefined) {
        const currentStep = steps[index];
        if (currentStep?.timer && currentStep.timer > 0) {
          setOriginalTime(currentStep.timer); // guardamos el tiempo original
          setIsWaiting(true);
          setTimeLeft(currentStep.timer);
        } else {
          setIsWaiting(false);
        }
        setCurrentIndex(index);
      }
    }
  ).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  if (steps.length === 0) {
    return (
      <View style={guiderStyles.container}>
        <Text>No hay datos disponibles.</Text>
      </View>
    );
  }

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      Alert.alert(
        '¡Felicidades!',
        'Ejercicio terminado. Esperamos que te haya ayudado a sentirte mejor 💙',
        [
          {
            text: 'Cerrar',
            onPress: () => {
              navigation.navigate('Exercises');
              console.log('Ejercicio cerrado');
            },
          },
        ]
      );
    }
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF6F0' }}>
    <View style={guiderStyles.container}>
      {/* Header del ejercicio */}
      <View style={guiderStyles.header}>
        <Text style={guiderStyles.exerciseTitle}>{exercise?.title}</Text>
        <Text style={guiderStyles.exerciseCategory}>{exercise?.category?.toUpperCase()}</Text>
      </View>

      {/* Carrusel de pasos */}
      <View style={guiderStyles.carouselBox}>
        <FlatList
          ref={flatListRef}
          data={steps}
          keyExtractor={(step) => step.step.toString()}
          renderItem={({ item }) => (
            <View style={guiderStyles.stepCard}>
              <View style={guiderStyles.imageWrapper}>
                <Animated.Image
                  source={item.image}
                  style={guiderStyles.stepImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={guiderStyles.stepTitle}>Paso {item.step}</Text>
              <Text style={guiderStyles.stepText}>{item.text}</Text>
              {item.timer > 0 && (
                <View style={guiderStyles.timerBox}>
                  {/* Barra de fondo que se llena */}
                  {isWaiting && (
                    <View
                      style={[
                        guiderStyles.timerFill,
                        {
                          width: `${((originalTime - timeLeft) / originalTime) * 100}%`,
                        },
                      ]}
                    />
                  )}
                  <Text style={guiderStyles.timerText}>
                    {isWaiting && timeLeft > 0
                      ? `⏳ Espera ${timeLeft} segundos...`
                      : `⏳ ${item.timer} segundos`}
                  </Text>
                </View>
              )}
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          style={{ flexGrow: 0 }}
        />
      </View>

      <Paginator data={steps} scrollX={scrollX} />

      <NextButton
        percentage={(currentIndex + 1) * (100 / steps.length)}
        onPress={handleNext}
        disabled={isWaiting}
        isWaiting={isWaiting}
        timeLeft={timeLeft}
        onToggleTimer={() => {
          if (isWaiting) {
            setIsWaiting(false);
          } else {
            setTimeLeft(originalTime);
            setIsWaiting(true);
          }
        }}
      />

      <View style={guiderStyles.footer}>
        <AnimatedCard
          onPress={() => navigation.navigate('Exercises')}
          style={guiderStyles.exitButton}
        >
          <Text style={guiderStyles.exitButtonText}>Salir del ejercicio</Text>
        </AnimatedCard>
      </View>
    </View>
  </SafeAreaView>
  );
}