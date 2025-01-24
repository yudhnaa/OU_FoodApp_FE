import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Image} from "expo-image";
import Colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router, useLocalSearchParams} from "expo-router";
// import Button from "@/components/home/button";
import Button from "../../../components/home/button";
// import InputField from "@/components/welcome/inputField";
import InputField from "../../../components/welcome/inputField";


function AddOtherMethod() {
    const { method } = useLocalSearchParams();

    useEffect(()=>{

    }, [])

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={"align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <View className={"w-full flex-col items-center justify-start p-3 m-2"}>
                    <Text>{method}</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        ...fontStyles.subtitulo,
        color: "black",
    }
});

export default AddOtherMethod;