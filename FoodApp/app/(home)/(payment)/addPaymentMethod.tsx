import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Icon, IconButton} from "react-native-paper";
import {Image} from "expo-image";
import Colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router} from "expo-router";
import Button from "@/components/home/button";


const paymentMethods = [
    {
        id: 1,
        methodName: "Credit card",
        icon: require("@/assets/images/icons/ico_card.svg"),
        isDefault: true
    },
    {
        id: 2,
        methodName: "Apple Pay",
        icon: require("@/assets/images/icons/ico_apple.svg"),
        isDefault: false
    },
    {
        id: 3,
        methodName: "Paypal",
        icon: require("@/assets/images/icons/ico_paypal.svg"),
        isDefault: false
    },
    {
        id: 4,
        methodName: "Google Pay",
        icon: require("@/assets/images/icons/ico_ggpay.svg"),
        isDefault: false
    }]

function AddPaymentMethod() {

    const [defaultMethod, setDefaultMethod] = useState();

    const setDefault = (method) => {

        if (method) {
            if (defaultMethod) {
                defaultMethod.isDefault = false;
            }
            method.isDefault = true;
            setDefaultMethod(method);
        }

    }

    useEffect(() => {
        paymentMethods.find((method) => {
            if (method.isDefault) {
                setDefaultMethod(method);
            }
        })

    }, [])

    const removeMethod = (method, index) => {
    }


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                {paymentMethods.map((method, index) => {
                    return (
                        <View key={index} className={"w-full flex-col justify-between p-3 m-2"}>
                            <View className={"flex-row items-center justify-between"}>
                                <Image
                                    source={method.icon}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    contentFit="contain"></Image>
                                <Text className={"justify-self-start"} style={styles.text}>{method.methodName}</Text>
                                {(method.methodName == "Credit card") &&
                                    <Button text={"Add"}
                                            onPress={() => router.push("/(payment)/addCreditCard")}></Button>}

                                {(method.methodName != "Credit card") &&
                                    <Button text={"Add"} onPress={() => router.push({
                                        pathname: "/(home)/(payment)/[addOtherMethod]",
                                        params: {method: JSON.stringify(method)}
                                    })}></Button>}
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        ...fontStyles.subtitulo,
        color: "black",
    }
})

export default AddPaymentMethod;