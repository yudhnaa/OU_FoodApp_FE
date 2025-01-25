import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {IconButton} from "react-native-paper";
import {Image} from "expo-image";
import Colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router} from "expo-router";
import Button from "@/components/home/button";

type PaymentMethod = {
    id: number;
    methodName: string;
    icon: any;
    isDefault: boolean;
};

const paymentMethods = [
    {
        id: 1,
        methodName: "Credit card: *** *** *** 43",
        icon: require("@/assets/images/icons/ico_card.svg"),
        isDefault: true
    },
    {
        id: 2,
        methodName: "Apple Pay: *** *** *** 43",
        icon: require("@/assets/images/icons/ico_apple.svg"),
        isDefault: false
    },
    {
        id: 3,
        methodName: "Paypal: *** *** *** 43",
        icon: require("@/assets/images/icons/ico_paypal.svg"),
        isDefault: false
    },
    {
        id: 4,
        methodName: "Google Pay: *** *** *** 43",
        icon: require("@/assets/images/icons/ico_ggpay.svg"),
        isDefault: false
    }]

const PaymentMethods = () => {

    const [defaultMethod, setDefaultMethod] = useState<PaymentMethod>();

    const setDefault = (method: PaymentMethod) => {
        if (method) {
            if (defaultMethod) {
                defaultMethod.isDefault = false;
            }
            method.isDefault = true;
            setDefaultMethod(method);
        }
    };

    useEffect(() => {
        paymentMethods.find((method) => {
            if (method.isDefault) {
                setDefaultMethod(method);
            }
        })

    }, [])

    const removeMethod = (method: PaymentMethod, index: number) => {
        console.log("removeMethod", method, index);
    };


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                {paymentMethods.map((method, index) => {
                    return (
                        <View key={index} className={"w-full flex-col justify-between p-3 m-2"}>
                            <View className={"flex-row items-center flex"}>
                                <Image
                                    source={method.icon}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    contentFit="contain"></Image>
                                <View className={"pl-5 flex-row justify-between items-center"}>
                                    <Text style={styles.text}>{method.methodName}</Text>
                                    <View style={{width: 30, height: 30}}>
                                        {(method == defaultMethod || method.isDefault) &&
                                            <IconButton className={""} icon={"check"} iconColor={"green"}></IconButton>}
                                    </View>
                                </View>
                            </View>
                            <View className={"flex-row"}>
                                <Button text={"Set as default"} onPress={() => setDefault(method)}></Button>
                                <Button buttonColor={Colors.Orange_2} textColor={Colors.Orange_Base} text={"Remove"}
                                        onPress={() => removeMethod(method, index)}></Button>
                            </View>
                        </View>
                    )
                })}
                <Button buttonColor={Colors.Orange_2} textColor={Colors.Orange_Base} text={"Add new payment method"} onPress={() => router.push("/(payment)/addPaymentMethod")}></Button>


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

export default PaymentMethods;