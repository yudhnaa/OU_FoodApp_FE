import { View } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import {
  useFonts,
  Spartan_100Thin,
  Spartan_200ExtraLight,
  Spartan_300Light,
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_600SemiBold,
  Spartan_700Bold,
  Spartan_800ExtraBold,
  Spartan_900Black,
} from "@expo-google-fonts/spartan";
import { ActivityIndicator } from "react-native";

export default function Home() {
  // Load fonts
  let [fontsLoaded] = useFonts({
    Spartan_100Thin,
    Spartan_200ExtraLight,
    Spartan_300Light,
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_600SemiBold,
    Spartan_700Bold,
    Spartan_800ExtraBold,
    Spartan_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      router.replace("/home");
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     router.replace("/loading");
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <View />;
}
