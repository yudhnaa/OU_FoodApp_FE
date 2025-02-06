import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import InputField from "@/components/welcome/inputField";
import colors from "../../styles/colors";
import { useState } from "react";
import APIs, { authApi, endpoints } from "@/configs/APIs";
import { LoadingOverlay } from "@/components/home/LoadingComponents";
import { useAuth } from "@/components/AuthContext";
import { GoogleSignInAuth } from "@/components/GoogleSignInAuth";


export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [access_token, setAccessToken] = useState("");
    const [oauth2Token, setOauth2Token] = useState(null);

    const { saveOauth2Token, setUserInfo } = useAuth();


    const fetchUserInfo = async (access_token: any) => {
        setLoading(true);
        try {
            await authApi(access_token).get(endpoints.get_user).then((res) => {
                console.info("User info:", res.data)
                setUserInfo(res.data);

                if (router.canDismiss())
                    router.dismissAll();
                if (res.data.role === "store")
                    router.replace('/(store)');
                if (res.data.role === "guest")
                    router.replace('/home');
            })
        } catch (ex) {
            alert("Failed to fetch user info");
            if (router.canDismiss()) router.dismissAll();
            router.replace('/login');
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {

        let data = {
            "grant_type": "password",
            "username": userName,
            "password": password,
            "client_id": "Ri4D3idLtSGLXUhGcrEyaupmuie1TYWbf5aAqUde",
            "client_secret": "vVkPNBcbuWiy6Y79Ei7JaazdcCRk5yzB3AZtEp655utXJFJdj4HEiTsGaOeOEItF7zXwTgqdfdDREA3B5bF5oyyY5Z5s0IzlKUiPl8vmPYNQRUaZqzIZIxQSX2sn8aib"
        }

        setLoading(true)
        await APIs.post(endpoints.login, data).then(res => {

            console.info("Login success", res.data)
            if (res.status === 200) {
                // Save token to local storage
                setOauth2Token(res.data)
                setAccessToken(res.data.access_token)
            }
        }).catch(ex => {
            alert(ex.response.data?.error_description || "Login failed\nStatus code" + ex.status)
        }).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (access_token) {
            fetchUserInfo(access_token)
        }
    }, [access_token])

    useEffect(() => {
        if (oauth2Token) {
            saveOauth2Token(oauth2Token)
        }
    }, [oauth2Token])


    const fillDefaultInfo = () => {
        setUserName("user9999")
        setPassword("user9999")
    }

    useEffect(() => {
        fillDefaultInfo()
    }, []);

    return (
        <View style={styles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}

            <View style={styles.signIn}>
                {/* username */}
                <InputField label="Email or phone number" placeholder="Enter email or phone number ..." value={userName}
                    onChange={setUserName}
                    autoCapitalize={'none'} />

                {/* Password */}
                <InputField label="Password" placeholder="Enter password ..." value={password} onChange={setPassword}
                    isSecure={true}
                    autoCapitalize={'none'} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { paddingHorizontal: 30 }]} onPress={login}>
                        <Text style={[styles.loginText, {}]}>Sign In</Text>
                    </TouchableOpacity>

                    <Text style={{ paddingHorizontal: 30 }}>Or</Text>

                    <GoogleSignInAuth setLoading={setLoading}></GoogleSignInAuth>
                </View>

                <TouchableOpacity style={{ marginTop: 10 }} onPressIn={() => {
                    router.push("/forgotPassword")
                }}>
                    <Text style={{ color: colors.Font }}>Forgot Password?</Text>
                </TouchableOpacity>

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
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: "3%",
    },
    button: {
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