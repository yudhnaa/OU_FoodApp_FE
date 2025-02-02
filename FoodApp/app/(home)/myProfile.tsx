import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image"
import {Button} from "react-native-paper";


import {styles as homeStyles} from "@/components/home/Styles";
import InputField from "@/components/welcome/inputField";
import {styles as inputFieldStyles} from "@/components/welcome/Styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {useAuth} from "@/components/AuthContext";
import {authApi, endpoints} from "@/configs/APIs";
import {router} from "expo-router";

function MyProfile() {
    const {userInfo, access_token} = useAuth()
    const [firstName, setFirstName] = useState(userInfo.first_name);
    const [lastName, setLastName] = useState(userInfo.last_name);
    const [email, setEmail] = useState(userInfo.email);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(userInfo.birthday));
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number);


    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    const updateProfile = async () => {
        await authApi(access_token).patch(`${endpoints.update_user}${userInfo.id}/`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            birthday: dateOfBirth.toISOString().split("T")[0]
        }).then(res => {
            alert("Update profile successfully")
            if (router.canDismiss())
                router.dismissAll()
            router.replace("/home");
        }).catch(ex => {
            alert("Update profile failed")
            console.error(ex.response.data)
        })
    }


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <Image
                    source={require("@/assets/images/avt_square.png")}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 30,
                    }}></Image>
                <Button
                    icon={"camera"}
                    textColor={"black"}
                    mode={"text"}
                    onPress={() => {
                    }}>Change avatar</Button>
                {/*<InputField label={"Full name"} value={fullName} onChange={setFullName}/>*/}
                <View style={styles.nameFieldContainer}>
                    <View style={styles.nameFieldItem}>
                        <Text style={inputFieldStyles.text}>First Name</Text>
                        <TextInput style={[inputFieldStyles.textInput, fontStyles.TextInputField, {height: 40}]}
                                   placeholder="Enter first name ..." value={firstName} onChangeText={setFirstName}/>
                    </View>
                    <View style={styles.nameFieldItem}>
                        <Text style={inputFieldStyles.text}>Last Name</Text>
                        <TextInput style={[inputFieldStyles.textInput, fontStyles.TextInputField, {height: 40}]}
                                   placeholder="Enter last name ..." value={lastName} onChangeText={setLastName}/>
                    </View>
                </View>

                <InputField label={"Email"} value={email} onChange={setEmail}/>
                <InputField label={"Phone number"} value={phoneNumber} onChange={setPhoneNumber}/>

                <View className={"self-start ml-10"}>
                    <Text className={""} style={inputFieldStyles.text}>Date Of Birth</Text>
                    <View style={{backgroundColor: "#fffabd", borderRadius: 10, width: "100%"}}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateOfBirth}
                            mode={"date"}
                            onChange={onChange}/>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.Orange_Base,
                        padding: 10,
                        margin: 20
                    }}
                    onPressIn={updateProfile}>
                    <Text
                        style={{
                            ...fontStyles.titulo_screen,
                            fontSize: 15,
                            color: colors.Font_2
                        }}>Update profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nameFieldContainer: {
        flexDirection: "row",
        width: "80%",
        marginBottom: 20,
    },
    nameFieldItem: {
        flex: 1,
    }
});

export default MyProfile;