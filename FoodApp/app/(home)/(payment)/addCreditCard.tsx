import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import {Image} from "expo-image";
import Colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import {router} from "expo-router";
// import Button from "@/components/home/button";
import Button from "../../../components/home/button";
// import InputField from "@/components/welcome/inputField";
import InputField from "../../../components/welcome/inputField";


function AddCreditCard() {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const saveCard = () => {
        console.log("save card")
    }

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={"align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <View className={"w-full flex-col items-center justify-start p-3 m-2"}>
                    <Image
                        source={require("@/assets/images/img_ccard.svg")}
                        style={{
                            width: "100%",
                            height: "50%",
                        }}
                        contentFit="contain"></Image>

                    <InputField label="Card holder name" placeholder="Enter card holder name..." value={cardHolderName}
                                onChange={setCardHolderName} containerClassName={"w-screen"}/>
                    <InputField label="Card number" placeholder="Enter card number..." value={cardNumber}
                                onChange={setCardNumber}/>
                    <View className={"flex-row w-3/6 justify-center items-start"}>
                        <InputField label="Expiry date" placeholder="/" value={expiryDate}
                                    onChange={setExpiryDate} containerClassName={""}/>
                        <InputField label="CVV" placeholder="0000" value={cvv}
                                    onChange={setCvv}/>
                    </View>
                    <Button text={"Save Card"} onPress={()=>saveCard()}></Button>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        ...fontStyles.subtitulo,
        color: "black",
    }
});

export default AddCreditCard;