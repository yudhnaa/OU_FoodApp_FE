import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Image} from "expo-image";
import InputField from "@/components/welcome/inputField";
import Button from "@/components/home/button";
import {router, useLocalSearchParams} from "expo-router";
import {authApi, endpoints} from "@/configs/APIs";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {useAuth} from "@/components/AuthContext";

function AddAddress() {
    const pageType = useLocalSearchParams().pageType;
    const parsedAddress = pageType === "edit" ? JSON.parse(useLocalSearchParams().address as string) : {};

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const {access_token, userInfo} = useAuth()


    useEffect(() => {
        if (pageType === "edit") {
            setId(parsedAddress.id)
            setName(parsedAddress.name)
            setAddress(parsedAddress.address)
        }
    }, [])

    const apply = async () => {
        // console.log(id, name, address)
        console.log("Apply");
        setLoading(true);
        if (pageType === "edit") {
            await authApi(access_token).patch(endpoints.address + parsedAddress.id + "/", {
                name: name,
                address: address
            }).then((res) => {
              alert("Address updated successfully")
            }).catch(ex => {
                alert(ex.response.data?.error_description || "Loading failed\nStatus code" + ex.status)
            }).finally(() => {
                setLoading(false);
            })
        }
        else {
            await authApi(access_token).post(endpoints.address, {
                name: name,
                address: address,
                user: userInfo.id
            }).then((res) => {
                alert("Address added successfully")
            }).catch(ex => {
                alert(ex.response.data?.error_description || "Loading failed\nStatus code" + ex.status)
            }).finally(() => {
                setLoading(false);
            })
        }

        router.back()

    }

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <Pressable>
                    <Image
                        source={require("@/assets/images/icons/home.svg")}
                        style={{
                            width: 100,
                            height: 100,
                        }}></Image>
                </Pressable>

                <InputField label={"Name"} value={name} onChange={setName}
                            placeholder={"Enter address..."}></InputField>

                <InputField label={"Address"}
                            value={address}
                            onChange={setAddress}
                            placeholder={"Enter name..."}
                            height={80}
                            multiline={true}
                            paddingTop={10}></InputField>

                <Button text={"Apply"} onPress={apply}></Button>

            </View>
        </View>
    );
}

export default AddAddress;