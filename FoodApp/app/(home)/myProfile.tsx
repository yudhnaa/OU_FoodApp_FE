import React from 'react';
import {useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {Image} from "expo-image"
import {Button} from "react-native-paper";


import {styles as homeStyles} from "@/components/home/Styles";
import InputField from "@/components/welcome/inputField";
import {styles as inputFieldStyles} from "@/components/welcome/Styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";

const userInfo = {
    name: "John Smith",
    email: "johnsmith@email.com",
    avatar: "@/assets/images/avt.png",
    dateOfBirth: "2004-12-11",
    phoneNumber: "+84 123 456 789"
}

function MyProfile() {
    const [fullName, setFullName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(userInfo.dateOfBirth));
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    const updateProfile = () => {
        console.log("Update profile");
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
                <InputField label={"Full name"} value={fullName} onChange={setFullName}/>


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

                <Pressable
                    style={{
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.Orange_Base,
                        padding: 10,
                        margin: 20
                    }}
                    onPress={updateProfile}>
                    <Text
                        style={{
                            ...fontStyles.titulo_screen,
                            fontSize: 15,
                            color: colors.Font_2
                        }}>Update profile</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default MyProfile;