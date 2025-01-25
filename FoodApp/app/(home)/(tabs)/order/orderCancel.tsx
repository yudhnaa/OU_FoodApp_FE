import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, Pressable} from 'react-native';
import {RadioButton} from "react-native-paper";
import {StyleSheet} from 'react-native';


import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import {styles as homeStyles} from "@/components/home/Styles";
import {router} from "expo-router";
import TextInputUser from "@/components/home/textInput";

const reasons = [
    "Lorem ipsum dolor sit amet1",
    "Lorem ipsum dolor sit amet2",
    "Lorem ipsum dolor sit amet3",
    "Lorem ipsum dolor sit amet4",
    "Lorem ipsum dolor sit amet5",
    "Others",
];

function OrderCancel() {
    const [reason, setReason] = useState(reasons[0]);
    const [otherReason, setOtherReason] = useState('');

    const handleSubmit = () => {
        router.replace("/order/orderCancelled");
        // if (reason === "Others") {
        //     console.log("Reason:", reason)
        //     console.log("Other reason:", otherReason)
        // } else
        //     console.log("Reason:", reason)

    };

    return (
        <View style={[homeStyles.backGround]}>
            <ScrollView className={"p-5"} style={[homeStyles.bodyPage, {backgroundColor: colors.Font_2}]}>
                <Text className={"mt-6 mb-6 ml-0"} style={{...fontStyles.Title, fontSize: 17}}>Hãy chọn lý do hủy đơn
                    hàng phù hợp:</Text>
                {reasons.map((r, index) => (
                    <Pressable key={index} className={"flex-row justify-between items-center mt-2 mb-2"}
                               style={[r === "Others" ? {borderBottomWidth: 0} : {borderBottomWidth: 2}, {borderColor: colors.Orange_2}]}
                               onPress={() => setReason(r)}>
                        <Text className={"mt-4 mb-4"}
                              style={styles.reasonContainer}>{r}</Text>
                        <RadioButton
                            value={r}
                            status={r === reason ? 'checked' : 'unchecked'}
                            onPress={() => setReason(r)}
                            uncheckedColor={colors.Orange_2}
                            color={colors.Orange_Base}
                        />
                    </Pressable>
                ))}

                <TextInputUser placeholder={"Others reason..."} value={otherReason} onChangeText={setOtherReason}/>

                <Pressable style={[styles.button]} onPress={handleSubmit}>
                    <Text style={[fontStyles.Title, {color: colors.Font_2, fontSize: 17}]}>Submit</Text>
                </Pressable>

            </ScrollView>
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