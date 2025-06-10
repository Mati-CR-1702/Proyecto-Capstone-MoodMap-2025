//C:\Moodmap\src\components\NextButton.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface NextButtonProps {
  percentage: number;
  onPress: () => void;
  disabled?: boolean;
  isWaiting?: boolean;
  timeLeft?: number;
  onToggleTimer?: () => void;
  progressColor?: string;
}

const NextButton: React.FC<NextButtonProps> = ({
  percentage,
  onPress,
  disabled = false,
  isWaiting = false,
  timeLeft = 0,
  onToggleTimer
}) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E6E7E8"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#E7B58F"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      <TouchableOpacity
        style={[styles.button, disabled && { opacity: 0.6 }]}
        onPress={disabled ? onToggleTimer : onPress}
        disabled={false} 
      >
        <Text style={styles.text}>
          {timeLeft === 0
            ? '↻'
            : isWaiting
              ? '⏸'
              : percentage >= 100
                ? '✓'
                : '→'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#E7B58F',
    borderRadius: 100,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  timerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#493d8a',
  },
});
