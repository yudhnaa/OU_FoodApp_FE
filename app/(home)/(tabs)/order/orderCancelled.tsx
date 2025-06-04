import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';


import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import {styles as homeStyles} from "@/components/home/Styles";
import { Stack} from "expo-router";
import {Image} from "expo-image";


function OrderCancel() {


    return (
        <View style={[homeStyles.backGround]}>
            <Stack.Screen options={{headerShown: true}}></Stack.Screen>
            <View className={"p-5 items-center justify-center"}
                  style={[homeStyles.bodyPage, {backgroundColor: colors.Yellow_Base}]}>
                <Image source={require("@/assets/images/icons/order-cancelled.png")}
                       style={{height: 150, width: 150}}></Image>
                <Text className={"p-10"} style={{...fontStyles.Title, fontSize: 30}}> Order Cancelled !</Text>
                <Text className={"text-center p-5"} style={{...fontStyles.subtitulo, fontSize: 17}}>Your order has been
                    successfully cancelled</Text>
            </View>
            <View style={{justifyContent: 'flex-end', marginBottom: 100}}>
                <Text className={"text-center p-5"} style={{...fontStyles.subtitulo, fontSize: 14}}>If you have any
                    question reach directly to our customer support</Text>
            </View>
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    reasonContainer: {
        ...fontStyles.subtitulo,
        fontSize: 16,
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 30,
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
        backgroundColor: colors.Orange_Base,
        alignSelf: "center",
    },

})

export default OrderCancel;