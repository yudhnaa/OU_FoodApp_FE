import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import {TextInput} from "react-native";
import React from "react";

const TextInputUser = ({placeholder, value, onChangeText}: {placeholder:string, value: string, onChangeText: Function }) => {
    return (<TextInput
        placeholder={placeholder}
        placeholderTextColor={"grey"}
        value={value}
        onChangeText={() => onChangeText}
        multiline={true}
        allowFontScaling={true}
        style={{
            ...fontStyles.Paragraph,
            lineHeight: 25,
            fontSize: 15,
            height: 100,
            color: "black",
            backgroundColor: colors.Yellow_2,
            borderRadius: 20,
            padding: 15,
        }}
    />)
}

export default TextInputUser