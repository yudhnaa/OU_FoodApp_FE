import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import InputField from "@/components/welcome/inputField";
import colors from "../../styles/colors";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.backGround}>
      <View style={styles.signIn}>

        {/* Email */}
        <InputField label="Email or phone number" placeholder="Enter email or phone number ..." value={userName} onChange={setUserName} />

        {/* ChangePassword */}
        <InputField label="ChangePassword" placeholder="Enter password ..." value={password} onChange={setPassword} />

        <View style={[styles.buttonContainer, {}]}>
          <Pressable style={[styles.button, { paddingHorizontal: 30 }]} onPress={() => router.push("/registration")}>
            <Text style={[styles.loginText, {}]}>Sign In</Text>
          </Pressable>
          <Text style={{ paddingHorizontal: 30 }}>Or</Text>
          <Text style={{ paddingHorizontal: 30 }}>Google</Text>
        </View>

        {/* Terms of Use */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to Terms of Use and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: colors.Yellow_Base,
    flex: 1,
  },
  signIn: {
    flex: 1,
    backgroundColor: colors.Font_2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    height: "6%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: "3%",
  },
  button: {
    height: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.Orange_Base,
  },
  loginText: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "500",
    color: "white",
  },
  termsContainer: {
    marginTop: "auto",
    paddingHorizontal: "10%",
    paddingBottom: 20,
  },
  termsText: {
    textAlign: "center",
  },
});