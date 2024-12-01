import { Text, View, StyleSheet, Alert, Linking, Platform, Button } from "react-native";
import { Link } from "expo-router";
export default function index() {
  return (
    <View>
      <Link href="/first">First Screen</Link>
      <Link href="/welcome">Welcome Screen</Link>
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
