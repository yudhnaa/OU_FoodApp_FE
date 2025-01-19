import { StyleSheet } from "react-native";
import colors from "@/styles/colors";

export const styles = StyleSheet.create({
    textInputContainer: {
        width: "80%",
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#391713",
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: colors.Yellow_2,
        borderRadius: 15,
        height: 50,
        paddingHorizontal: 10,
    },
    phonePrefix: {
        flex: 1,
        backgroundColor: "#F3E9B5",
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 50,
    },
    phoneInput: {
        flex: 3,
        backgroundColor: "#F3E9B5",
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 50,
    },
});