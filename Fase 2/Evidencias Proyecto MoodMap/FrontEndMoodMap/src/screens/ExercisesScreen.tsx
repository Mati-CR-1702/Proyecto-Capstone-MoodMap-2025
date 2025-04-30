import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  PanResponder,
  StatusBar,
} from 'react-native';

type Exercise = {
  id: string;
  icon: string;
  mood: string;
  steps: string[];
  benefits: string[];
  duration: string;
  difficulty: string;
};

const exercises: Exercise[] = [
  {
    id: '1',
    icon: '🧘‍♀️',
    mood: 'Ansiedad',
    steps: [
      'Encuentra un lugar tranquilo.',
      'Siéntate cómodamente.',
      'Inhala profundamente durante 4 segundos.',
      'Exhala lentamente durante 6 segundos.',
      'Repite por 5 minutos.'
    ],
    benefits: [
      'Reduce la ansiedad.',
      'Mejora la concentración.',
      'Regula la respiración.'
    ],
    duration: '5 minutos',
    difficulty: 'Fácil',
  },
  {
    id: '3',
    icon: '😢',
    mood: 'Triste',
    steps: [
      'Escucha una canción que te calme.',
      'Escribe cómo te sientes sin juzgarte.',
      'Abraza una almohada o peluche.',
      'Respira lentamente durante 2 minutos.'
    ],
    benefits: [
      'Valida tus emociones.',
      'Ayuda a procesar la tristeza.',
      'Fomenta el autocuidado.'
    ],
    duration: '7 minutos',
    difficulty: 'Media',
  },
];

export default function ExercisesScreen() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const translateY = useRef(new Animated.Value(1000)).current;
  const lastGestureDy = useRef(0);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const openBottomSheet = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsBottomSheetVisible(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 1,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: 1000,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setIsBottomSheetVisible(false);
      setSelectedExercise(null);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = lastGestureDy.current + gestureState.dy;
        if (newTranslateY > 0) {
          translateY.setValue(newTranslateY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        lastGestureDy.current += gestureState.dy;
        
        if (lastGestureDy.current < 300) {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 1,
          }).start();
          lastGestureDy.current = 0;
        } else {
          closeBottomSheet();
          lastGestureDy.current = 0;
        }
      },
    })
  ).current;

  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => openBottomSheet(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.cardText}>
        <Text style={styles.mood}>{item.mood}</Text>
        <Text style={styles.meta}>{item.duration} · {item.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFDF8" barStyle="dark-content" />
      <Text style={styles.title}>Ejercicios Emocionales</Text>
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {isBottomSheetVisible && (
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={styles.backdropTouchable}
            onPress={closeBottomSheet}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              { transform: [{ translateY }] }
            ]}
          >
            <View style={styles.sheetHandle} {...panResponder.panHandlers} />
            
            <ScrollView 
              style={styles.sheetContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {selectedExercise && (
                <View style={styles.exerciseDetails}>
                  <View style={styles.headerSection}>
                    <Text style={styles.modalIcon}>{selectedExercise.icon}</Text>
                    <Text style={styles.modalTitle}>{selectedExercise.mood}</Text>
                    <View style={styles.tagContainer}>
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>{selectedExercise.duration}</Text>
                      </View>
                      <View style={[
                        styles.tag, 
                        selectedExercise.difficulty === 'Fácil' ? styles.easyTag : styles.mediumTag
                      ]}>
                        <Text style={styles.tagText}>{selectedExercise.difficulty}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pasos a seguir</Text>
                    {selectedExercise.steps.map((step, index) => (
                      <View key={index} style={styles.stepItem}>
                        <Text style={styles.stepNumber}>{index + 1}</Text>
                        <Text style={styles.stepText}>{step}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Beneficios</Text>
                    {selectedExercise.benefits.map((benefit, index) => (
                      <View key={index} style={styles.benefitItem}>
                        <Text style={styles.benefitIcon}>✓</Text>
                        <Text style={styles.benefitText}>{benefit}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={closeBottomSheet}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.closeText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F7ECDC',
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 42,
    marginRight: 18,
  },
  cardText: {
    flex: 1,
  },
  mood: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#5A3E36',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#6B5E55',
  },
  bottomSheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '85%',
    backgroundColor: '#FFFDF8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#D0D0D0',
    borderRadius: 3,
    marginTop: 12,
    marginBottom: 10,
    alignSelf: 'center',
  },
  sheetContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  exerciseDetails: {
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 8,
  },
  modalIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5A3E36',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 30,
    backgroundColor: '#E6C8A3',
    marginHorizontal: 6,
  },
  easyTag: {
    backgroundColor: '#C8E6C9',
  },
  mediumTag: {
    backgroundColor: '#FFECB3',
  },
  hardTag: {
    backgroundColor: '#FFCDD2',
  },
  tagText: {
    color: '#5A3E36',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A3E36',
    marginBottom: 14,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: '#F0DFC0',
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
    fontWeight: 'bold',
    color: '#5A3E36',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  benefitIcon: {
    color: '#8BC34A',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: '#E6C8A3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  closeText: {
    fontWeight: 'bold',
    color: '#5A3E36',
    fontSize: 16,
  },
});