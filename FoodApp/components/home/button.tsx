import colors from "@/styles/colors";
import {TouchableOpacity, Text} from "react-native";
import fontStyles from "@/styles/fontStyles";
import React from "react";

const Button = ({
                    text,
                    onPress,
                    buttonColor = colors.Orange_Base,
                    textColor = colors.Font_2,
                    textClassName = "",
                    buttonClassName = "",
                    disabled = false
                }: {
    text: string,
    onPress: () => void,
    buttonColor?: string,
    textColor?: string,
    buttonClassName?: string,
    textClassName?: string,
    disabled?: boolean
}) => {
    return (
        <TouchableOpacity
            style={{
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: buttonColor,
                padding: 10,
                paddingHorizontal: 20,
                margin: 20
            }}
            className={buttonClassName}
            onPressIn={onPress}
            disabled={disabled}>
            <Text
                style={{
                    ...fontStyles.titulo_screen,
                    fontSize: 15,
                    color: textColor
                }}
                className={textClassName}
            >{text}</Text>
        </TouchableOpacity>
    );
}

export default Button