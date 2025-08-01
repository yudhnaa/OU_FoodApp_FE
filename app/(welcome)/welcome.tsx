import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import colors from "../../styles/colors";
import fontStyles from "../../styles/fontStyles";


export default function Welcome() {
  return (
    <View style={styles.welcomeScreen}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo/logo-welcome.svg")}
        contentFit="contain" />
      <View style={{ flex: 0.5, marginTop: "30%" }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#f5cb58" }]} onPress={() => { router.push("/login") }}>
          <Text style={[styles.text, fontStyles.Title]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#F3E9B5" }]} onPress={() => { router.push("/registration") }}>
          <Text style={[styles.text, fontStyles.Title]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeScreen: {
    flex: 1,
    backgroundColor: "#E95322",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  text: {
    textTransform: "capitalize",
    color: colors.Orange_Base,
  },
  image: {
    marginTop: "50%",
    flex: 0.5,
    width: "50%",
  }
});
