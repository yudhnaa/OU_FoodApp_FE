import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-element-dropdown";
import {router} from "expo-router";

const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
];

export default function CSignUp() {
    const [dropdownValue, setDropdownValue] = useState<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState<Date>(new Date());

    useEffect(() => {

    }, [dayOfBirth]);

    return (
        <View style={styles.backGround}>
            <Text style={styles.title}>New Account</Text>

            <View style={styles.signUp}>
                {/* First and Last Name */}
                <View style={styles.nameFieldContainer}>
                    {["First Name", "Last Name"].map((label, index) => (
                        <View style={styles.nameFieldItem} key={index}>
                            <Text style={styles.text}>{label}</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    style={styles.placeHolder}
                                    placeholder={label}
                                />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Password */}
                <View style={styles.textInputContainer}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.textInput}>
                        <TextInput style={styles.placeHolder} placeholder="Enter password ..." />
                    </View>
                </View>

                {/* Email */}
                <View style={styles.textInputContainer}>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.textInput}>
                        <TextInput style={styles.placeHolder} placeholder="Enter email ..." />
                    </View>
                </View>

                {/* Phone Number */}
                <View style={styles.textInputContainer}>
                    <Text style={styles.text}>Phone Number</Text>
                    <View style={[styles.textInput, { flexDirection: "row" }]}>
                        <TextInput style={{ marginLeft: 10, width: "15%" }} editable={false}>
                            +84
                        </TextInput>
                        <TextInput
                            style={{ marginLeft: 10, width: "80%" }}
                            placeholder="Enter phone number ..."
                        />
                    </View>
                </View>

                {/* Role and Date of Birth */}
                <View style={styles.nameFieldContainer}>
                    <View style={styles.nameFieldItem}>
                        <Text style={styles.text}>Role</Text>
                        <View style={styles.textInput}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeHolder}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                value={dropdownValue}
                                onChange={(item) => setDropdownValue(item.value)}
                            />
                        </View>
                    </View>

                    <View style={styles.nameFieldItem}>
                        <Text style={styles.text}>Date Of Birth</Text>
                        <View style={[styles.textInput, { alignItems: "center" }]}>
                            <Pressable onPress={() => setDatePickerVisibility(true)}>
                                <Text>
                                    {`${dayOfBirth.getDate()}/${dayOfBirth.getMonth() + 1}/${dayOfBirth.getFullYear()}`}
                                </Text>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={(date) => {
                                    setDatePickerVisibility(false);
                                    setDayOfBirth(date);
                                }}
                                onCancel={() => setDatePickerVisibility(false)}
                            />
                        </View>
                    </View>
                </View>

                <Pressable style={[styles.button, {marginVertical: "3%"}]} onPress={() => {router.push("/register")}}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </Pressable>

                <View>
                    <Text>Or sign-up with</Text>
                    <Pressable style={{justifyContent:"center"}}>
                        <Text style={{textAlign:"center"}}>Google</Text>
                    </Pressable>
                </View>

                {/* Terms of Use */}
                <View style={styles.termsContainer}>
                    <Text style={{ textAlign: "center" }}>
                        By continuing, you agree to Terms of Use and Privacy Policy
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: "#f5cb58",
        flex: 1,
    },
    title: {
        color: "#F8F8F8",
        fontSize: 28,
        fontWeight: "700",
        alignSelf: "center",
        marginVertical: 60,
    },
    signUp: {
        flex: 1,
        backgroundColor: "#F5F5F5",
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
    textInputContainer: {
        width: "80%",
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: "#F3E9B5",
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 40,
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#391713",
        marginBottom: 4,
    },
    dropdown: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeHolder: {
        fontSize: 15,
    },
    termsContainer: {
        marginTop: "auto",
        paddingHorizontal: "10%",
        paddingBottom: 20,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    button: {
        width: "45%",
        height: "6%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
        backgroundColor: "#e95322",
    },
    loginText: {
        fontSize: 20,
        textTransform: "capitalize",
        fontWeight: "500",
        fontFamily: "LeagueSpartan-Medium",
        color: "white",
}
});
