import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import InputField from "@/components/welcome/inputField";
import colors from "../../constrants/color";

export default function Login() {
  return (
    <View style={styles.backGround}>
      <View style={styles.signUp}>
        

        {/* Email */}
        <InputField label="Email" placeholder="Enter email ..." />

        {/* Password */}
        <InputField label="Password" placeholder="Enter password ..." />


        <View style={[styles.buttonContainer, {}]}>
          <Pressable style={[styles.button, { paddingHorizontal: 30 }]} onPress={() => router.push("/registration")}>
            <Text style={[styles.loginText, {}]}>Sign Up</Text>
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
  signUp: {
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