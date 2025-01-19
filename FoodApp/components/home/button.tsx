import colors from "@/styles/colors";
import {Pressable, Text} from "react-native";
import fontStyles from "@/styles/fontStyles";
import React from "react";

const Button = ({text, onPress, buttonColor=colors.Orange_Base, textColor=colors.Font_2}:{text: string, onPress: () => void, buttonColor?: string, textColor?: string}) => {
    return (
        <Pressable
            style={{
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: buttonColor,
                padding: 10,
                paddingHorizontal: 20,
                margin: 20
            }}
            onPress={onPress}>
            <Text
                style={{
                    ...fontStyles.titulo_screen,
                    fontSize: 15,
                    color: textColor
                }}>{text}</Text>
        </Pressable>
    );
}

export default Button