import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {styles as bgStyle} from "@/components/home/Styles";
import {Image} from "expo-image";
import {router} from "expo-router";
import fontStyles from "../../../styles/fontStyles";
import Button from "../../../components/home/button";

function DeleteAccount(props) {

    const deleteAccount = () => {
        alert("Account deleted");
        router.back();
    }
    return (
        <View style={bgStyle.backGround}>
            <View className={"items-center justify-center"} style={bgStyle.bodyPage}>
                <Text className={"text-center m-5"} style={styles.text}>Are you sure you want to delete your account?</Text>

                <View className={"flex-row justify-around"}>
                    <Button text={"Yes"} onPress={()=>{deleteAccount()}}></Button>

                    <Button text={"No"} onPress={()=>{router.back()}}></Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },
    title: {
        ...fontStyles.subtitulo,
    },
    text: {
        ...fontStyles.Title,
        fontWeight: 'bold',
        fontSize: 20,
    }
});


export default DeleteAccount;