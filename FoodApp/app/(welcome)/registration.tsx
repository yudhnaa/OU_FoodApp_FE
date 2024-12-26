import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import InputField from "@/components/welcome/inputField";
import PhoneNumberInput from "@/components/welcome/phoneNumberField";
import { styles as inputFieldStyles } from "@/components/welcome/Styles";
import colors from "../../constrants/color";
const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
];

export default function Registration() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [date, setDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.backGround}>
            <View style={styles.signUp}>
                {/* First and Last Name */}
                <View style={styles.nameFieldContainer}>
                    {["First Name", "Last Name"].map((label, index) => (
                        <View style={styles.nameFieldItem} key={index}>
                            <Text style={inputFieldStyles.text}>{label}</Text>
                            <TextInput style={inputFieldStyles.textInput} placeholder={label} />
                        </View>
                    ))}
                </View>

                {/* Password */}
                <InputField label="Password" placeholder="Enter password ..." />
                {/* Email */}
                <InputField label="Email" placeholder="Enter email ..." />
                {/* Phone Number */}
                <PhoneNumberInput />

                {/* Role and Date of Birth */}
                <View style={styles.nameFieldContainer}>
                    <View style={styles.nameFieldItem}>
                        <Text style={inputFieldStyles.text}>Role</Text>
                        <DropDownPicker
                            style={styles.dropdown}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                        />
                    </View>
                    <View style={[styles.nameFieldItem, { justifyContent: 'center' }]}>
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
                    <Pressable style={[styles.button, { paddingHorizontal: 30 }]} onPress={() => router.push("/registration")}>
                        <Text style={[styles.loginText, {}]}>Sign Up</Text>
                    </Pressable>
                    <Text style={[{ paddingHorizontal: 30 }]}>Or</Text>
                    <Text style={[{ paddingHorizontal: 30 }]}>Google</Text>
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