import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import {Slider} from '@react-native-community/slider';
import Slider from '@react-native-community/slider';


export default function PriceSlider() {
  const [price, setPrice] = useState(1); // Giá trị ban đầu là $1

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price : {price} $</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={100}
        step={1}
        value={price}
        minimumTrackTintColor="#FF5722"
        maximumTrackTintColor="#CCCCCC"
        thumbTintColor="#FF5722"
        onValueChange={(value) => setPrice(value)}
      />
      <View style={styles.priceLabels}>
        <Text style={styles.priceText}>$1</Text>
        <Text style={styles.priceText}>$100 &gt;</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  label: {
    fontSize: 18,
    fontFamily : 'Spartan_500Medium',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceText: {
    fontSize: 14,
    color: '#8C8C8C',
  },
});
