import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList,
         Image, useWindowDimensions, Animated, ViewToken} from 'react-native';
import { exercises } from '../data/exercises';
import OnboardingItem from '../components/OnboardingItem'

//array list
export const firstStep = exercises[0]?.steps?.[0] ?? null;

export default function Onboarding() {

  if (!firstStep) {
    return (
      <View style={styles.container}>
        <Text>No hay datos disponibles.</Text>
      </View>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollX = useRef(new Animated.Value(9)).current;

  const viewableItemsChanged = useRef(
  ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    const index = viewableItems[0]?.index;
    if (index !== null && index !== undefined) {
      setCurrentIndex(index);
        }
    }
    ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

  return (
    <View style={styles.container}>
    <View style={{flex:3}}>
      <FlatList
        data={[firstStep]}
        keyExtractor={(step) => step.step.toString()}
        renderItem={({ item }) => (
            <View>
            <Image source={item.image} style={{ width: 200, height: 200 }} />
            <Text>{item.text}</Text>
            </View>
        )}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        onScroll=
        {Animated.event([{contentOffset: {x: scrollX}}],
        {useNativeDriver: false, })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        />
    </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
});