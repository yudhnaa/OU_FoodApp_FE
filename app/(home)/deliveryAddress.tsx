import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {IconButton} from "react-native-paper";
import {Image} from "expo-image";
import fontStyles from "@/styles/fontStyles";
import {router, useFocusEffect} from "expo-router";
import Button from "@/components/home/button";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";

type Address = {
    id: number;
    created_at: string;
    is_active: boolean;
    address: string;
    name: string;
    user: number;
};

export default function DeliveryAddress() {

    const [addresses, setAddresses] = useState<Address[]>([])
    const {access_token} = useAuth()
    const [loading, setLoading] = useState(false)

    const editAddress = (address: Address) => {
        router.push({
            pathname: "/addAddress", params: {
                address: JSON.stringify(address),
                pageType: "edit"
            }
        })
    }

    const removeAddress = (address: Address, index: number) => {
        setAddresses(addresses.filter((item, i) => i !== index))
    }

    const fetchAddress = async () => {
        setLoading(true);
        try {
            const res = await authApi(access_token).get(endpoints.address);
            setAddresses(res.data);
        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAddress();
        }, [access_token])
    );

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                {addresses.map((address, index) => {
                    return (
                        <View key={index} className={"w-full flex-row justify-between p-3 m-2"}>
                            <View className={"flex-row items-center flex-1"}>
                                <Image
                                    source={require("@/assets/images/icons/home.svg")}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}></Image>
                                <View className={"pl-5"}>
                                    <Text style={styles.text}>{address.name}</Text>
                                    <Text style={[styles.text, {fontSize: 12}]}>{address.address}</Text>
                                </View>
                            </View>

                            <View className={"flex-row justify-around"}>
                                <IconButton icon={"pencil"} size={20} iconColor={"black"}
                                            onPress={() => editAddress(address)}/>

                                <IconButton icon={"trash-can"} size={20} iconColor={"red"}
                                            onPress={() => removeAddress(address, index)}></IconButton>
                            </View>
                        </View>
                    )
                })}
                <Button text={"Add address"} onPress={() => router.push("/addAddress")}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        ...fontStyles.subtitulo,
        color: "black",
    }
})