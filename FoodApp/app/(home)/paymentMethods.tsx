import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {IconButton} from "react-native-paper";
import {Image} from "expo-image";
import Colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router} from "expo-router";
import Button from "@/components/home/button";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";


const PaymentMethods = () => {
    const iconMap: { [key: string]: any } = {
        momo: require("@/assets/images/icons/ico_momo.svg"),
        zalopay: require("@/assets/images/icons/ico_zalopay.svg"),
        paypal: require("@/assets/images/icons/ico_paypal.svg"),
        stripe: require("@/assets/images/icons/ico_stripe.svg"),
        cash: require("@/assets/images/icons/ico_cash.svg"),
    };

    type PaymentMethods = {
        "id": number,
        "user": number,
        "payment_type": string,
        "created_at": string,
        "isActive": boolean,
        "isDefault": boolean,
        "icon": string
    };

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
    const [defaultMethod, setDefaultMethod] = useState<PaymentMethods>();
    const {access_token} = useAuth();
    const [loading, setLoading] = useState(false);

    const setDefault = (method: PaymentMethods) => {
        setLoading(true);
        authApi(access_token).post(endpoints.set_default_payment_method, {
            "user_payment_id": method.id
        }).then((res) => {
            if (method.payment_type === res.data.payment_type) {
                if (defaultMethod) {
                    defaultMethod.isDefault = false;
                }
                method.isDefault = true;
                setDefaultMethod(method);
            }

        }).catch(ex => {
            alert(ex.response.data?.error_description || "Loading failed\nStatus code" + ex.status)
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        const getPaymentMethods = async () => {
            setLoading(true);
            authApi(access_token).get(endpoints.payment_methods).then((res) => {
                const methods = res.data.payment_methods.map((method: PaymentMethods) => {
                    const iconKey = method.payment_type.toLowerCase().replace(" ", "_");
                    method.icon = iconMap[iconKey] || null;
                    return method;
                });
                setPaymentMethods(methods);
            }).catch(ex => {
                alert(ex.response.data?.error_description || "Get payment methods failed\nStatus code" + ex.status)
            }).finally(() => {
                setLoading(false);
            })
        }
        getPaymentMethods()
    }, [])

    useEffect(() => {
        paymentMethods.find((method) => {
            if (method.isDefault) {
                setDefaultMethod(method);
            }
        });
    }, [paymentMethods]);

    const removeMethod = (method: PaymentMethods, index: number) => {
        console.log("removeMethod", method, index);
        setLoading(true);
        authApi(access_token).post(endpoints.remove_payment_method, {
            "method_id": method.id
        }).then((res) => {
            paymentMethods.splice(index, 1);
            setPaymentMethods([...paymentMethods]);
        }).catch(ex => {
            alert(ex.response.data?.error_description || "Delete failed\n" + ex.response.data?.message || "Delete failed\nStatus code" + ex.status)
        }).finally(() => {
            setLoading(false);
        })
    };


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
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
                                    <Text style={styles.text}>{method.payment_type}</Text>
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
                <Button buttonColor={Colors.Orange_2} textColor={Colors.Orange_Base} text={"Add new payment method"}
                        onPress={() => router.push("/(payment)/addPaymentMethod")}></Button>


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