import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from "react-native";
import {router} from "expo-router";
import colors from "../../styles/colors";
import fontStyles from "../../styles/fontStyles";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import APIs, {endpoints} from "@/configs/APIs";
import InputField from "@/components/welcome/inputField";
import Button from "@/components/home/button";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            await APIs.post(" ", {email});
            Alert.alert("Success", "Password reset link has been sent to your email");
            router.replace("/login");
        } catch (error) {
            Alert.alert("Error", "Failed to send password reset link");
        } finally {
            setLoading(false);
        }
    };

    const sendOTP = async () => {
        setLoading(true);
        try {
            await APIs.post(endpoints.send_otp, {
                phone_number: phoneNumber,
                country_code: "VN",
            }).then(res => {
                if (res.status === 200) {
                    Alert.alert("Success", "OTP sent successfully");
                }
            });
        } catch (ex: any) {
            Alert.alert("Error", "Failed to send OTP\n", ex.data?.error_description || "Status code" + ex.status);
        } finally {
            setLoading(false);
        }

    }
    const resetPassword = async () => {
        setLoading(true);
        try {
            await APIs.post(endpoints.verify_otp, {
                phone_number: phoneNumber,
                country_code: "VN",
                otp: otp,
                new_password: newPassword,
            }).then(res => {
                if (res.status === 200) {
                    Alert.alert("Success", "Password reset successfully");
                    router.back()
                }
            });
        } catch (ex: any) {
            Alert.alert("Error", "Failed to reset password\n", ex.data?.error_description || "Status code" + ex.status);
        } finally {
            setLoading(false);
        }

    }

    return (
        <View style={styles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View style={styles.signIn}>
                    <InputField label={"Phone number"} placeholder={"Enter your phone number..."} value={phoneNumber}
                                onChange={setPhoneNumber}/>

                    <InputField label={"OTP"} placeholder={"Enter OTP..."} value={otp} onChange={setOtp}/>

                    <InputField label={"New Password"} placeholder={"Enter New Password..."} value={newPassword} onChange={setNewPassword} isSecure={true}/>


                    <View className={"flex-row "}>
                        <Button text={"Send OTP"} onPress={sendOTP}></Button>

                        <Button text={"Reset Password"} onPress={resetPassword}></Button>
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Yellow_Base,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        width: "80%",
        backgroundColor: colors.Font_2,
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: colors.Orange_Base,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: colors.Orange_Base,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
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
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: "3%",
    },
    loginText: {
        fontSize: 20,
        textTransform: "capitalize",
        fontWeight: "500",
        color: "white",
        paddingVertical: 10,
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