import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import {RadioButton} from "react-native-paper";
import {StyleSheet} from 'react-native';


import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import {styles as homeStyles} from "@/components/home/Styles";
import {router, useLocalSearchParams} from "expo-router";
import TextInputUser from "@/components/home/textInput";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {useAuth} from "@/components/AuthContext";
import {authApi, endpoints} from "@/configs/APIs";


const reasons = [
    "Too expensive",
    "I don't want it anymore",
    "I don't like the product",
    "I don't like the service",
    "I don't like the delivery",
    "Others",
];

function OrderCancel() {
    const [loading, setLoading] = useState(false);
    const {access_token} = useAuth();

    const [reason, setReason] = useState(reasons[0]);
    const [otherReason, setOtherReason] = useState('');
    const orderInfo = JSON.parse(useLocalSearchParams().orderInfo as string);

    const handleSubmit = async () => {
        try{
            setLoading(true);
            const response = await authApi(access_token).patch(`${endpoints.user_order}${orderInfo.order_id}/`, {
                cancelReason: reason === "Others" ? otherReason : reason
            });
            console.log("Response:", response.data);
            router.replace("/order/orderCancelled");
        } catch (e:any) {
            Alert.alert("Error:", e.response.data);
        } finally {
            setLoading(false);
        }

        // if (reason === "Others") {
        //     console.log("Reason:", reason)
        //     console.log("Other reason:", otherReason)
        // } else
        //     console.log("Reason:", reason)
    };

    useEffect(() => {
        // console.log("Order Info:", orderInfo)
    }, [orderInfo]);

    return (
        <View style={[homeStyles.backGround]}>
            {loading && <LoadingOverlay/>}
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