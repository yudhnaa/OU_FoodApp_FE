import React from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Icon} from "react-native-paper";
import {Image} from "expo-image";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router} from "expo-router";
import Button from "@/components/home/button";
import {PressableEvent} from "react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps";

const addresses = [
    {
        id: 1,
        addressName: "Home",
        address: "1234 Main St, Springfield, IL 62701",
        icon: "@/assets/images/icons/home.svg",
    },
    {
        id: 2,
        addressName: "Work",
        address: "1235 Main St, Springfield, IL 62701",
        icon: "home"
    },
    {
        id: 3,
        addressName: "Parent",
        address: "1236 Main St, Springfield, IL 62701",
        icon: "home"
    },
    {
        id: 4,
        addressName: "Home 2",
        address: "1237 Main St, Springfield, IL 62701",
        icon: "home"
    },
    {
        id: 5,
        addressName: "Other",
        address: "1238 Main St, Springfield, IL 62701",
        icon: "home"
    }]

export default function DeliveryAddress() {

    const editAddress = (address: {id: number, addressName: string, address: string, icon: string}) => {
        router.push({pathname:"/addAddress", params: address})
    }

    const removeAddress = (address: {id: number, addressName: string, address: string, icon: string}, index: number) => {
        addresses.splice(index, 1)
    }

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                {addresses.map((address, index) => {
                    return (
                        <View key={index} className={"w-full flex-row justify-between p-3 m-2"}>
                            <View className={"flex-row items-center flex-1"}>
                                <Image
                                    source={require("@/assets/images/icons/home.svg")}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}></Image>
                                <View className={"pl-5"}>
                                    <Text style={styles.text}>{address.addressName}</Text>
                                    <Text style={[styles.text, {fontSize: 12}]}>{address.address}</Text>
                                </View>
                            </View>

                            <View className={"flex-row"}>
                                <Pressable onPress={()=>editAddress(address)}>
                                    <Icon source={"pencil"} size={20} color={"black"}/>
                                </Pressable>


                                <Pressable onPress={()=>removeAddress(address, index)}>
                                    <Icon source={"trash-can"} size={20} color={"red"}/>
                                </Pressable>
                            </View>
                        </View>
                    )
                })}
                <Button text={"Add address"} onPress={() => router.push("/addAddress")}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        ...fontStyles.subtitulo,
        color: "black",
    }
})