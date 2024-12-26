import { Text, View, StyleSheet, Alert, Linking, Platform, Button, Pressable } from "react-native";
import { useState, useEffect } from "react";
// import Logo from "../../assets/images/logo/logo-welcome.svg";
import { Image } from "expo-image";
import {router, Link} from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.welcomeScreen}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo/logo-welcome.svg")}
        contentFit="contain"/>
        <View style={{flex:0.5, marginTop: "30%"}}>
            <Pressable style={[styles.button, {backgroundColor: "#f5cb58"}]} onPress={() => {router.push("/login")}}>
                <Text style={styles.text}>Log In</Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: "#F3E9B5"}]} onPress={() => {router.push("/registration")}}>
                <Text style={styles.text}>Register</Text>
            </Pressable>
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
    width: "150",
    height: "50",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  text: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "500",
    fontFamily: "LeagueSpartan-Medium",
    color: "#e95322",
  },
  image: {
    marginTop: "50%",
    flex: 0.5,
    width: "50%",
  }
});
