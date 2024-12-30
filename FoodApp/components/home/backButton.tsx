import { Pressable } from "react-native";
import { router } from "expo-router";
import {Icon} from 'react-native-paper'
export default function BackButton() {
    return (
        <Pressable onPressIn={() => { router.back() }}>
            <Icon
                source="chevron-left"
                color={"#E95322"}
                size={35}
            />
        </Pressable>
    )
}
