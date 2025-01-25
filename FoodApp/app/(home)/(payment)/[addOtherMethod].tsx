import React, {useEffect} from 'react';
import {View, Text} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {useLocalSearchParams} from "expo-router";


function AddOtherMethod() {
    const { method } = useLocalSearchParams();

    useEffect(()=>{

    }, [])

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={"align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <View className={"w-full flex-col items-center justify-start p-3 m-2"}>
                    <Text>{method}</Text>
                </View>

            </View>
        </View>
    );
}



export default AddOtherMethod;