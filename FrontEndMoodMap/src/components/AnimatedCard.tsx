import React, { useRef } from 'react';
import { Animated, Pressable, Platform, ViewStyle } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export default function AnimatedCard({ children, onPress, style }: AnimatedCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  const handlePressIn = () => animateTo(0.95);
  const handlePressOut = () => animateTo(1);
  const handleHoverIn = () => Platform.OS === 'web' && animateTo(1.05);
  const handleHoverOut = () => Platform.OS === 'web' && animateTo(1);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onPress={onPress}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
