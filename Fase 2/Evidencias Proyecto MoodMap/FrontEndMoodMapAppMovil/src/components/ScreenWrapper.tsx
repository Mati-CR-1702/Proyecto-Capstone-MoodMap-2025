// src/components/ScreenWrapper.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export default function ScreenWrapper({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecc395',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

{/*boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'*/}
