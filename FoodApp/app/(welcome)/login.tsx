import React, {useEffect} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {router} from "expo-router";
import InputField from "@/components/welcome/inputField";
import colors from "../../styles/colors";
import {useState} from "react";
import APIs, {endpoints} from "@/configs/APIs";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {useAuth} from "@/components/AuthContext";


export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {saveOauth2Token} = useAuth();

    const login = async () => {

        let data = {
            "grant_type": "password",
            "username": userName,
            "password": password,
            "client_id": process.env.EXPO_PUBLIC_CLIENT_ID,
            "client_secret": process.env.EXPO_PUBLIC_CLIENT_SECRET
        }

        setLoading(true)
        await APIs.post(endpoints.login, data).then(res => {
            if (res.status === 200) {
                // Save token to local storage
                saveOauth2Token('oauth2-token',res.data)
                if (router.canGoBack())
                    router.dismissAll()
                router.replace("/home")
            }
        }).catch(ex => {
            alert(ex.response.data?.error_description || "Login failed\nStatus code"+ex.status)
        }).then(() => {
            setLoading(false)
        })
    }

    const fillDefaultInfo = () => {
        setUserName("user1")
        setPassword("user1")
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
                            autoCapitalize={'none'}/>

                {/* Password */}
                <InputField label="Password" placeholder="Enter password ..." value={password} onChange={setPassword}
                            isSecure={true}
                            autoCapitalize={'none'}/>

                <View style={[styles.buttonContainer, {}]}>
                    <TouchableOpacity style={[styles.button, {paddingHorizontal: 30}]} onPress={login}>
                        <Text style={[styles.loginText, {}]}>Sign In</Text>
                    </TouchableOpacity>
                    <Text style={{paddingHorizontal: 30}}>Or</Text>
                    <Text style={{paddingHorizontal: 30}}>Google</Text>
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