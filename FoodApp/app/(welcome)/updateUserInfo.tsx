import React, {useEffect} from 'react';
import {useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image"
import {Button} from "react-native-paper";


import {styles as homeStyles} from "@/components/home/Styles";
import InputField from "@/components/welcome/inputField";
import {styles as inputFieldStyles} from "@/components/welcome/Styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {useAuth} from "@/components/AuthContext";
import APIs, {authApi, endpoints} from "@/configs/APIs";
import {router, useLocalSearchParams} from "expo-router";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import PhoneNumberInput from "@/components/welcome/phoneNumberField";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

type UserInf = {
    id: number;
    last_login: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    date_joined: string;
    store_name: string;
    role: string;
    avatar: string | null;
    phone_number: string;
    birthday: string;
};

function UpdateUserInfo() {
    const {access_token} = useAuth();

    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [userInf, setUserInf] = useState<UserInf | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("guest");
    const [date, setDate] = useState(new Date());

    const show = useLocalSearchParams().origin !== "google";
    const test = useLocalSearchParams().origin

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) setDate(selectedDate);
    };

    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const res = await authApi(access_token).get(endpoints.get_user);
            setUserInf(res.data);
        } catch (ex) {
            alert("Failed to fetch user info");
            if (router.canDismiss()) router.dismissAll();
            router.replace('/login');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        setLoading(true);
        try {
            let res = await APIs.get(endpoints.roles);
            setRoles(res.data.roles.map((role: any) => ({
                label: role[1],
                value: role[0]
            })));
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log('Error Response:', error.response?.data);
            } else {
                console.log('General Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles().then(fetchUserInfo);
    }, []);

    useEffect(() => {
        if (userInf) {
            setUsername(userInf.username);
            setFirstName(userInf.first_name);
            setLastName(userInf.last_name);
            setEmail(userInf.email);
            setPhoneNumber(userInf.phone_number);
            setRole(userInf.role);
            setDate(new Date(userInf.birthday));
        }
    }, [userInf]);

    const updateProfile = async () => {
        if (!userInf) return;

        try {
            await authApi(access_token).patch(`${endpoints.update_google_user_info}${userInf.id}/`, {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                birthday: date.toISOString().split("T")[0]
            });
            alert("Update profile successfully");
            if (router.canDismiss()) router.dismissAll();
            router.replace("/home");
        } catch (ex: any) {
            alert(`Update profile failed\n${ex.response.data?.phone_number || "Status code " + ex.status}`);
            // console.error(ex.response?.data);
        }
    };


    return (
        <View style={styles.backGround}>
            {loading && (
                <LoadingOverlay></LoadingOverlay>
            )}
            <View style={[styles.signUp]} pointerEvents={loading ? "none" : "auto"}>
                {/* First and Last Name */}
                <View style={styles.nameFieldContainer}>
                    <View style={styles.nameFieldItem}>
                        <Text style={inputFieldStyles.text}>First Name</Text>
                        <TextInput style={[inputFieldStyles.textInput, fontStyles.TextInputField]}
                                   placeholder="Enter first name ..." value={firstName} onChangeText={setFirstName}/>
                    </View>
                    <View style={styles.nameFieldItem}>
                        <Text style={inputFieldStyles.text}>Last Name</Text>
                        <TextInput style={[inputFieldStyles.textInput, fontStyles.TextInputField]}
                                   placeholder="Enter last name ..." value={lastName} onChangeText={setLastName}/>
                    </View>
                </View>

                {/* Username */}
                <InputField label="Username" placeholder="Enter username ..." value={username} onChange={setUsername}
                            isSecure={false} inputDisabled={true}/>

                {/* Email */}
                <InputField label="Email" placeholder="Enter email ..." value={email} onChange={setEmail}
                            inputDisabled={true}/>

                {/* Phone Number */}
                <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber}/>

                {/* Role and Date of Birth */}
                <View style={styles.nameFieldContainer}>
                    {show && (
                        <View style={styles.nameFieldItem}>
                            <Text style={inputFieldStyles.text}>Role</Text>
                            {roles.length === 0 ? <ActivityIndicator></ActivityIndicator> :
                                <>
                                    <DropDownPicker
                                        style={styles.dropdown}
                                        open={open}
                                        value={role}
                                        items={roles}
                                        setOpen={setOpen}
                                        setValue={setRole}
                                    />
                                </>
                            }
                        </View>
                    )}

                    <View style={[styles.nameFieldItem, {justifyContent: 'center'}]}>
                        <Text style={inputFieldStyles.text}>Date Of Birth</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            onChange={onChange}
                        />
                    </View>
                </View>


                <View style={[styles.buttonContainer, {}]}>
                    <TouchableOpacity style={[styles.button, {paddingHorizontal: 30}]}
                                      disabled={loading}
                                      onPress={updateProfile}>
                        <Text style={[styles.loginText, {}]}>Update</Text>
                    </TouchableOpacity>
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
    nameFieldContainer: {
        flexDirection: "row",
        width: "80%",
        marginBottom: 20,
    },
    nameFieldItem: {
        flex: 1,
    },
    dropdown: {
        backgroundColor: colors.Yellow_2,
        borderWidth: 0,
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
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
    phonePrefix: {
        marginLeft: 10,
        width: "15%",
    },
    phoneInput: {
        marginLeft: 10,
        width: "80%",
    },
});

export default UpdateUserInfo;