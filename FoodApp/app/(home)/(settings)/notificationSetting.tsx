import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {styles as bgStyle} from "@/components/home/Styles";
import {Switch} from "react-native-paper";
import Colors from "../../../styles/colors";
import fontStyles from "../../../styles/fontStyles";

function NotificationSetting() {

    const data = {
        general: true,
        sound: true,
        vibration: true,
        promotion: true,
    }

    const [general, setGeneral] = useState(data.general);
    const [sound, setSound] = useState(data.sound);
    const [vibration, setVibration] = useState(data.vibration);
    const [promotion, setPromotion] = useState(data.promotion);

    const cusSetGeneral = ()=>{
        setGeneral(!general);
    }

    const cusSetSound = ()=>{
        setSound(!sound);
    }

    const cusSetVibration = ()=>{
        setVibration(!vibration);
    }

    const cusSetPromotion = ()=>{
        setPromotion(!promotion);
    }

    return (
        <View style={bgStyle.backGround}>
            <View style={bgStyle.bodyPage}>
                <View style={styles.container}>
                    <Text style={styles.title}>General Notification</Text>
                    <Switch value={general} onValueChange={cusSetGeneral} color={Colors.Orange_Base}></Switch>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Sound</Text>
                    <Switch value={sound} onValueChange={cusSetSound} color={Colors.Orange_Base}></Switch>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Vibration</Text>
                    <Switch value={vibration} onValueChange={cusSetVibration} color={Colors.Orange_Base}></Switch>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Promotion</Text>
                    <Switch value={promotion} onValueChange={cusSetPromotion} color={Colors.Orange_Base}></Switch>
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
        justifyContent: 'space-between',
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


export default NotificationSetting;