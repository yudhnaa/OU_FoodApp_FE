import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import React, {useCallback} from 'react';
import {useState} from 'react';
import { Rating } from '@kolking/react-native-rating';

import {TextInputUser} from "@/components/home/textInput";
import {styles as homeStyles} from "@/components/home/Styles";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router} from "expo-router";

const order = {
    id: 1,
    name: "Strawberry shake",
    price: 20.00,
    date: "29 Nov, 01:20 pm",
    image: require('@/assets/images/bestSeller_pic/pic_1.png'),
    items: 2,
    status: "active"
}

function ReviewOrder() {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState(0);

    const submitReview = () => {
        console.log("Submit review");
    }


    const handleChange = useCallback(
        (value: number) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={"align-center flex-1 p-5"} style={homeStyles.bodyPage}>
                <Image source={order.image}
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
                    }}>{order.name}</Text>

                <Text style={{...styles.text, marginVertical: 20}}>We'd love to know what you think of your dish.</Text>

                <Rating
                    style={{alignSelf:"center"}}
                    size={40}
                    rating={rating}
                    onChange={handleChange}
                    variant={"stars-outline"}
                />

                <Text style={{...styles.text, marginVertical: 20}}>Leave us your comment !</Text>

                <View style={{marginVertical: 20}}>
                    <TextInputUser placeholder={"Your review"} value={comment} onChangeText={setComment}></TextInputUser>
                </View>

                <View className={"flex-row flex-1 mt-5 justify-around"}>
                    <Pressable style={{...styles.button, backgroundColor: colors.Orange_2}} onPress={() => router.back()}>
                        <Text style={{...fontStyles.subtitulo, fontSize: 20, color: colors.Orange_Base}} >Cancel</Text>
                    </Pressable>

                    <Pressable style={{...styles.button, backgroundColor: colors.Orange_Base}} onPress={submitReview}>
                        <Text style={{...fontStyles.subtitulo, fontSize: 20, color: colors.Font_2}}>Submit</Text>
                    </Pressable>
                </View>


            </View>
        </View>
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