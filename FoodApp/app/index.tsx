import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location"
import { useState } from "react";

export default function Index() {
  // Trang thai cua location service
  const [locationServiceEnabled, setLocationService] = useState(false)
  // Dia chi hien tai
  const [currentAddress, setCurrentAddress] = useState("Locating ...")


  return (
    <View style={styles.center}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})