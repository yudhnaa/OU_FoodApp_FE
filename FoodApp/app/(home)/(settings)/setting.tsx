import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {styles as bgStyle} from "@/components/home/Styles";
import {Image} from "expo-image";
import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import {router} from "expo-router";
import fontStyles from "../../../styles/fontStyles";


function Setting(props) {
    return (
        <View style={bgStyle.backGround}>
            <View style={bgStyle.bodyPage}>
                <View style={styles.container}>
                    <Image source={require("../../../assets/images/icons/ico_notification.svg")}
                           style={styles.image} contentFit={"contain"}></Image>
                    <Pressable onPress={()=>{router.push('notification')}}>
                        <Text style={styles.title}>Notification</Text>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Image source={require("../../../assets/images/icons/ico_key.svg")}
                           style={styles.image} contentFit={"contain"}></Image>
                    <Pressable onPress={()=>{router.push('changePassword')}}>
                        <Text style={styles.title}>Change Password</Text>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Image source={require("../../../assets/images/icons/ico_user.svg")}
                           style={styles.image} contentFit={"contain"}></Image>
                    <Pressable onPress={()=>{router.push('deleteAccount')}}>
                        <Text style={styles.title}>Delete Account</Text>
                    </Pressable>
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
        marginLeft: 20,
        ...fontStyles.subtitulo,
    },
});


export default Setting;