import { View, Text, Pressable } from "react-native";
import {router, Link} from "expo-router";
import { StyleSheet } from "react-native";
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";

export default function FavoritePage() {
    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <Text>This is the favorite page</Text>
            </View>
        </View>
    );
}
