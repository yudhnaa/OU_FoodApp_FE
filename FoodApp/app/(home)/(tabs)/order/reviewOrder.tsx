import {View, Text, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Image} from 'expo-image';
import React, {useCallback, useEffect, useState} from 'react';
import {Rating} from '@kolking/react-native-rating';

import TextInputUser from "@/components/home/textInput";
import {styles as homeStyles} from "@/components/home/Styles";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router, useLocalSearchParams} from "expo-router";
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {authApi, endpoints} from "@/configs/APIs";

function ReviewOrder() {
    const [loading, setLoading] = useState(false);
    const {access_token} = useAuth()

    const orderInfo = JSON.parse(useLocalSearchParams().orderInfo as string)

    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState(0);

    const submitReview = async () => {
        setLoading(true);
        try {
            const data = {
                order_dish_id: orderInfo.id,
                order_id: orderInfo.order_id,
                rating: rating,
                comment: comment
            }
            console.log(data);
            await authApi(access_token).post(`${endpoints.dish_review}`, data)
            router.back();
        } catch (e:any) {
            Alert.alert("Error Submitting Review", e);
            console.log("Error Submitting Review", e);
        } finally {
            setLoading(false);
        }

        console.log("Submit review");
    }

    useEffect(() => {
        console.log("Order Info:", orderInfo);
    }, [orderInfo]);

    const handleChange = useCallback(
        (value: number) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className={"flex-1"} style={homeStyles.backGround}>
                    {loading && <LoadingOverlay/>}
                    <View className={"align-center flex-1 p-5"} style={homeStyles.bodyPage}>
                        <Image source={{uri: orderInfo.image}}
                               style={{
                                   width: 150,
                                   height: 150,
                                   borderRadius: 20,
                                   alignSelf: "center",
                               }}
                        ></Image>

                        <Text
                            style={{
                                ...fontStyles.Title,
                                fontSize: 20,
                                color: "black",
                                textAlign: "center",
                                marginVertical: 10,
                                marginTop: 20,
                            }}>{orderInfo.name}</Text>

                        <Text style={{...styles.text, marginVertical: 20}}>We'd love to know what you think of your dish.</Text>

                        <Rating
                            style={{alignSelf: "center"}}
                            size={40}
                            rating={rating}
                            onChange={handleChange}
                            variant={"stars-outline"}
                        />

                        <Text style={{...styles.text, marginVertical: 20}}>Leave us your comment !</Text>

                        <View style={{marginVertical: 20}}>
                            <TextInputUser placeholder={"Your review"} value={comment}
                                           onChangeText={setComment}></TextInputUser>
                        </View>

                        <View className={"flex-row flex-1 mt-5 justify-around"}>
                            <Pressable style={{...styles.button, backgroundColor: colors.Orange_2}}
                                       onPress={() => router.back()}>
                                <Text style={{...fontStyles.subtitulo, fontSize: 20, color: colors.Orange_Base}}>Cancel</Text>
                            </Pressable>

                            <Pressable style={{...styles.button, backgroundColor: colors.Orange_Base}} onPress={submitReview}>
                                <Text style={{...fontStyles.subtitulo, fontSize: 20, color: colors.Font_2}}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
    },
    text: {
        ...fontStyles.Paragraph,
        fontSize: 20,
        color: "black",
        textAlign: "center",
        marginVertical: 10,
    }
})

export default ReviewOrder;