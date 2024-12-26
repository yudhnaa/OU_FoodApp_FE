import { View, Text, Pressable } from "react-native";
import {router, Link} from "expo-router";

export default function Home() {
    return (
        <View>
            <Text>This is the Home page</Text>
            <Pressable>This is the home page</Pressable>
        </View>
    );
}
