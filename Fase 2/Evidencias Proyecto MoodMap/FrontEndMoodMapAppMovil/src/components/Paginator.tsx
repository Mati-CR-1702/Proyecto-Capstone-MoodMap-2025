import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PaginatorProps {
  data: any[];
  scrollX: Animated.Value;
    color?: string;

}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * 300, i * 300, (i + 1) * 300];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#493d8a',
    marginHorizontal: 6,
  },
});
