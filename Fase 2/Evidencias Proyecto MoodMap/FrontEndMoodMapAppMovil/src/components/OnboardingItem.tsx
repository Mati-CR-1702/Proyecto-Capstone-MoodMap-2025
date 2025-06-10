//C:\Moodmap\src\components\OnboardingItem.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

interface OnboardingItemProps {
  imagen: any;
  step: number;
  text: string;
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ imagen, step, text }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={imagen}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>Paso {step}:</Text>
        <Text style={styles.description}>{text}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800', 
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
