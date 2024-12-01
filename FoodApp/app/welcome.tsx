import { Text, View, StyleSheet, Alert, Linking, Platform, Button, Pressable } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import Constrains from "expo-constants";
import Logo from "../assets/images/logo-welcome.svg";

export default function welcome() {
  return (
    <View style={styles.welcomeScreen}>
      <Logo style={styles.logo} />
      <Pressable style={[styles.button, {backgroundColor: "#f5cb58"}]} onPress={() => { }}>
        <Text style={styles.text}>Log In</Text>
      </Pressable>
      <Pressable style={[styles.button, {backgroundColor: "#F3E9B5"}]} onPress={() => { }}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
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
  logo: {
    marginTop: "30%",
    marginBottom: "20%",
  },
  button: {
    width: "45%",
    height: "6%",
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
  }
});
