import { View, StyleSheet, Alert, Linking } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import Constrains from "expo-constants";
import Logo from "../assets/images/logo-first.svg";

export default function firstScreen() {
  // Trang thai cua location service cua thiet bi
  const [locationServicesEnabled, setLocationServices] =
    useState<boolean>(false);
  // Trang thai cua quyen truy cap vi tri
  const [locationPermission, setLocationPermission] =
    useState<string>("denied");
  // Dia chi hien tai
  const [currentAddress, setCurrentAddress] = useState<Location.LocationGeocodedAddress | null>(null);

  useEffect(() => {
    const checkAndGetLocation = async () => {
      await checkLocationPermission();
      await checkLocationServicesEnabled();
      await getCurrentLocation();
    };

    checkAndGetLocation();
  }, []);

  const checkLocationServicesEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services Not Enabled",
        `Please enable location services on your device`,
        [
          {
            text: "OK",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setLocationServices(true);
    }
  };

  const checkLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Allow Location Permisson",
        `Please allow location services for ${Constrains.expoConfig?.name} in Settings`,
        [
          {
            text: "OK",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    } else {
      setLocationPermission(status);
    }
  };

  const getCurrentLocation = async () => {
    let { latitude, longitude } = (await Location.getCurrentPositionAsync())
      .coords;

    let address = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });
    setCurrentAddress(address[0]);
  };

  return (
    <View style={styles.firstScreen}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  firstScreen: {
    flex: 1,
    backgroundColor: "#F5CB58",
    justifyContent: "center",
    alignItems: "center"
  },
});
