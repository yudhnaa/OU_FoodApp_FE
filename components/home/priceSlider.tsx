import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

interface PriceSliderProps {
  onValueChange: (values: number[]) => void;
}

export default function PriceSlider({ onValueChange }: PriceSliderProps) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const handleMinValueChange = (value: number) => {
    const newMin = Math.min(value, maxValue - 1);
    setMinValue(newMin);
    onValueChange([newMin, maxValue]);
  };

  const handleMaxValueChange = (value: number) => {
    const newMax = Math.max(value, minValue + 1);
    setMaxValue(newMax);
    onValueChange([minValue, newMax]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price Range</Text>

      <View style={styles.slidersContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          value={minValue}
          onValueChange={handleMinValueChange}
          minimumTrackTintColor="#E95322"
          maximumTrackTintColor="#F3E9B5"
          thumbTintColor="#E95322"
          step={1}
        />

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          value={maxValue}
          onValueChange={handleMaxValueChange}
          minimumTrackTintColor="#E95322"
          maximumTrackTintColor="#F3E9B5"
          thumbTintColor="#E95322"
          step={1}
        />
      </View>

      <View style={styles.priceDisplay}>
        <Text style={styles.priceText}>${Math.round(minValue)}</Text>
        <Text style={styles.priceText}>${Math.round(maxValue)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Spartan_500Medium',
    marginBottom: 10,
  },
  slidersContainer: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  priceText: {
    fontSize: 14,
    color: '#8C8C8C',
    fontFamily: 'Spartan_500Medium',
  },
});