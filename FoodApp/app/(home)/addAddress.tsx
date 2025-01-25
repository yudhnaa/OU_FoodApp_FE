import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Icon} from "react-native-paper";
import {Image} from "expo-image";
import InputField from "@/components/welcome/inputField";
import Button from "@/components/home/button";
import {useLocalSearchParams} from "expo-router";

function AddAddress() {

    const address = useLocalSearchParams();

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [addressState, setAddressState] = useState<string>("");


    useEffect(() => {
        // console.log(address)
        if (Object.keys(address).length !== 0) {
            setId(address.id.toString())
            setName(address.addressName.toString())
            setAddressState(address.address.toString())
        }
    }, [])

    const apply = () => {
        // console.log(id, name, addressState)
        console.log("Apply");
    }

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
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
                            value={addressState}
                            onChange={setAddressState}
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