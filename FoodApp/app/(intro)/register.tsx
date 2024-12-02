import {Text, View, StyleSheet, Alert, Linking, Platform, Button, Pressable, TextInput} from "react-native";
import {useState, useEffect} from "react";
import Constrains from "expo-constants";
import Logo from "../../assets/images/logo-welcome.svg";
import {Link, router} from "expo-router";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
];

export default function CSignUp() {
    const [dropdownValue, setdropdownValue] = useState<string | null>(null);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState<Date>(new Date())

    useEffect(() => {

    }, [dayOfBirth])

    return (
        <View style={styles.backGround}>
            <Text style={styles.title}>New Account</Text>

            <View style={styles.signUp}>

                <View style={styles.nameFieldContainer}>
                    <View style={styles.nameFieldItem}>
                        <Text style={styles.text}>First Name</Text>
                        <View style={styles.textInput}>
                            <TextInput style={{"marginLeft": 10, "marginRight": 10}}
                                       placeholder={"First Name"}></TextInput>
                        </View>
                    </View>

                    <View style={styles.nameFieldItem}>
                        <Text style={styles.text}>Last Name</Text>
                        <View style={styles.textInput}>
                            <TextInput style={{"marginLeft": 10, "marginRight": 10}}
                                       placeholder={"Last Name"}></TextInput>
                        </View>
                    </View>
                </View>

                <View style={styles.textInputCotainer}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.textInput}>
                        <TextInput style={{"marginLeft": 10, "marginRight": 10}}
                                   placeholder={"Enter password ..."}></TextInput>
                    </View>
                </View>

                <View style={styles.textInputCotainer}>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.textInput}>
                        <TextInput style={{"marginLeft": 10, "marginRight": 10}}
                                   placeholder={"Enter email ..."}></TextInput>
                    </View>
                </View>

                <View style={styles.textInputCotainer}>
                    <Text style={styles.text}>Phone Number</Text>
                    <View style={[styles.textInput, {"flexDirection": "row"}]}>
                        <TextInput style={{"marginLeft": 30, "width": "10%"}} editable={false}>+84</TextInput>
                        <TextInput style={{"marginRight": 10, "width": "90%"}}
                                   placeholder={"Enter phone number ..."}></TextInput>
                    </View>
                </View>

                <View style={styles.nameFieldContainer}>
                    <View style={styles.nameFieldItem}>
                        <Text style={styles.text}>Role</Text>
                        <View style={styles.textInput}>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select item'}
                                value={dropdownValue}
                                onChange={item => {
                                    setdropdownValue(item.value);
                                }}
                            />

                        </View>
                    </View>

                    <View style={styles.nameFieldItem}>
                        <Text style={styles.text}>Date Of Birth</Text>
                        <View style={[styles.textInput, { alignItems: "center", justifyContent: "center" }]}>
                            <Pressable onPress={() => setDatePickerVisibility(true)}>
                                <Text>{`${dayOfBirth.getDate()}/${(dayOfBirth.getMonth() + 1).toString()}/${dayOfBirth.getFullYear().toString()}`}</Text>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={(date) => {
                                        setDatePickerVisibility(false);
                                        setDayOfBirth(date);
                                    }}
                                    onCancel={() => {
                                        setDatePickerVisibility(false);
                                    }}
                                />
                            </Pressable>
                        </View>

                    </View>
                </View>


            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    nameFieldContainer: {
        flex: 0.105,
        flexDirection: "row",
        marginTop: "5%",
        width: "80%",

    },
    nameFieldItem: {
        flex: 1,
        flexDirection: "column",
    },
    backGround: {
        backgroundColor: "#f5cb58",
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        color: "#F8F8F8",
        fontFamily: "League Spartan",
        fontSize: 28,
        fontStyle: "normal",
        fontWeight: 700,
        alignSelf: "center",
        marginBottom: "10%",
    },
    signUp: {
        flex: 0.9,
        backgroundColor: "#F5F5F5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center"
    },
    textInputCotainer: {
        flex: 0.11,
        width: "80%",
        marginTop: "3%"
    },
    textInput: {
        backgroundColor: "#F3E9B5",
        flex: 1,
        borderRadius: 15,
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "LeagueSpartan-Medium",
        color: "#391713",
        textAlign: "left",
        marginBottom: 4,
        marginLeft: 8,
    },


    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
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
    placeholderStyle: {
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});