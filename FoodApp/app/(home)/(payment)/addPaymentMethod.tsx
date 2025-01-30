import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Icon, IconButton} from "react-native-paper";
import {Image} from "expo-image";
import Colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router, useLocalSearchParams} from "expo-router";
import Button from "@/components/home/button";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";


function AddPaymentMethod() {
    type paymentMethod = {
        id: number,
        type: string,
        icon: any,
    }
    const iconMap: { [key: string]: any } = {
        momo: require("@/assets/images/icons/ico_momo.svg"),
        zalopay: require("@/assets/images/icons/ico_zalopay.svg"),
        paypal: require("@/assets/images/icons/ico_paypal.svg"),
        stripe: require("@/assets/images/icons/ico_stripe.svg"),
        cash: require("@/assets/images/icons/ico_cash.svg"),
    };

    // const [method, setMethod] = useState<paymentMethod>();
    const [paymentMethods, setPaymentMethods] = useState<Array<paymentMethod>>([]);
    const {access_token} = useAuth();
    const [loading, setLoading] = useState(false);

    const parsedUserMethods = useLocalSearchParams().methods.toString().split(',');

    useEffect(() => {
        setLoading(true);
        const getPaymentMethods = async () => {
            await authApi(access_token).get(endpoints.get_payment_type).then((res) => {
                let notUserMethods = res.data.filter((method : paymentMethod) => !parsedUserMethods.includes(method.type))
                let methodWithIcon = notUserMethods.map((method: paymentMethod) => {
                    const iconKey = method.type.toLowerCase().replace(" ", "_");
                    method.icon = iconMap[iconKey] || null;
                    return method;
                });
                setPaymentMethods(methodWithIcon);
            }).catch(ex => {
                alert(ex.response.data?.error_description || "Loading failed\nStatus code" + ex.status)
            }).finally(() => {
                setLoading(false);
            })
        }
        getPaymentMethods()

        // console.log(parsedUserMethods)
    }, []);


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
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
                                <Text className={"justify-self-start"} style={styles.text}>{method.type}</Text>

                                <Button text={"Add"} onPress={() => router.push({
                                    pathname: "/(home)/(payment)/[addOtherMethod]",
                                    params: {
                                        addOtherMethod: method.id,
                                        method: JSON.stringify(method)
                                    }
                                })}></Button>
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