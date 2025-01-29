import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import Button from "@/components/home/button";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";


function AddOtherMethod() {
    const parseMethod = JSON.parse(useLocalSearchParams().method as string);
    const [loading, setLoading] = useState(true);
    const {access_token, userInfo} = useAuth();
    const [state, setState] = useState<boolean>(false);


    useEffect(() => {

        setLoading(true);
        const getPaymentMethods = async () => {
            await authApi(access_token).post(endpoints.payment_methods, {
                "payment_type": parseMethod.id,
                "isActive": false,
                "isDefault": false,
                "user": userInfo.id
            }).then((res) => {
                setState(true);
            }).catch(ex => {
                setState(false);
                alert(ex.response.data?.error_description || "Loading failed\nStatus code" + ex.status)
            }).finally(() => {
                setLoading(false);
            })
        }

        getPaymentMethods()
    }, []);

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <Stack.Screen options={{title:parseMethod.type }}></Stack.Screen>
            {loading && (
                <LoadingOverlay></LoadingOverlay>
            )}
            <View className={"align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <View className={"w-full flex-col items-center justify-center flex-1 p-3 m-2"}>
                    {state ? (
                        <Text style={styles.text}>Added {parseMethod.type} successfully</Text>
                    ) : (
                        <Text style={styles.text}>Failed to add {parseMethod.type}</Text>
                    )}

                    <Button text={"Return"} onPress={()=>{
                        if (router.canDismiss())
                            router.dismiss(2)
                        router.replace("/paymentMethods")
                    }}></Button>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.Font,
        ...fontStyles.subtitulo
    }
})


export default AddOtherMethod;