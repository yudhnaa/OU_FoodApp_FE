import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {router} from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import InputField from "@/components/welcome/inputField";
import PhoneNumberInput from "../../components/welcome/phoneNumberField";
import {styles as inputFieldStyles} from "@/components/welcome/Styles";
import colors from "../../styles/colors";
import fontStyles from "../../styles/fontStyles";
import axios from "axios";
import APIs, {endpoints} from "@/configs/APIs";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {useAuth} from "@/components/AuthContext";

export default function Registration() {
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("guest");
    const [date, setDate] = useState(new Date());
    const {location} = useAuth();

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const validatePhoneNumber = (phoneNumber:string) => {
        const phoneRegex = /(?:\+84|0084|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}(?:[^\d]+|$)/g;
        return phoneRegex.test(phoneNumber);
    };

    const fillDefaultInfo = () => {
        setFirstName("user9999");
        setLastName("user9999");
        setEmail("user9999@gmail.com");
        setPassword("user9999");
        setPhoneNumber("344778045");
        setRole("guest");
        setDate(new Date());
        setUsername("user9999");
    }

    const register = async () => {

        if (!validatePhoneNumber("0"+phoneNumber)) {
            alert("Invalid phone number")
            return;
        }

        let data = {
            "first_name": firstName,
            "last_name": lastName,
            "username": username,
            "password": password,
            "phone_number": "0"+phoneNumber,
            "email": email,
            "role": role,
            "date_of_birth": date.getDate().toString(),
            "location": location.longitude + ";" + location.latitude
        }

        setLoading(true)
        let res = await APIs.post(endpoints.register, data).then(res => {
            if (res.status === 201) {
                alert("Register successfully")
                router.dismissAll()
                router.replace("/welcome")
            }
        }).catch(ex => {
            switch (ex.status) {
                case 400:
                    alert("Invalid input\n" + JSON.stringify(ex.response.data?.username[0] || ex.response.data))
                    break;
                default:
                    alert(ex.response.data?.error_description || "Registration failed\nStatus code" + ex.status)
            }
        }).then(() => {
            setLoading(false)
        })
    }


    useEffect(() => {
        fillDefaultInfo()

        const fetchRoles = async () => {
            setLoading(true)
            try {
                let res = await APIs.get(endpoints.roles)

                setRoles(res.data.roles.map((role: any) => ({
                    label: role[1],
                    value: role[0]
                })))
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    console.log('Error Response:', error.response?.data);
                    console.log('Error Status:', error.response?.status);
                    console.log('Error Headers:', error.response?.headers);
                } else {
                    console.log('General Error:', error.message);
                }
            } finally {
                setLoading(false)
            }
        }

        fetchRoles()

    }, []);

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
                            isSecure={false}/>

                {/* Password */}
                <InputField label="Password" placeholder="Enter password ..." value={password} onChange={setPassword}
                            isSecure={true}/>

                {/* Email */}
                <InputField label="Email" placeholder="Enter email ..." value={email} onChange={setEmail}/>

                {/* Phone Number */}
                <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber}/>

                {/* Role and Date of Birth */}
                <View style={styles.nameFieldContainer}>
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
                                      onPress={register}>
                        <Text style={[styles.loginText, {}]}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={[{paddingHorizontal: 30}]}>Or</Text>
                    <Text style={[{paddingHorizontal: 30}]}>Google</Text>
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