import { View, Text, Pressable } from "react-native";
import {router, Link} from "expo-router";
import { StyleSheet } from "react-native";
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";
import { Icon } from "react-native-paper";

export default function HelpPage() {
    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles1.txtDescripContainer}>
                    <Text style={styles1.txtDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem.
                    </Text>
                    <View style={styles.seperateLine}></View>
                </View>

                <View className="pl-5 pr-5">
                    <View className="flex-row justify-between items-center">
                        <Text style = {styles1.txtTitle}>Help with the order</Text>
                        <Pressable onPress={() => router.push('/help_with_order')}>
                            <Icon 
                                source="chevron-right"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
                    <Text style = {styles1.txtDescription}>Support</Text>
                    <View style={styles.seperateLine}></View>
                </View>

                <View className="pl-5 pr-5">
                    <View className="flex-row justify-between items-center">
                        <Text style = {styles1.txtTitle}>Help Center</Text>
                        <Pressable onPress={() => router.push('/help_center')}>
                            <Icon 
                                source="chevron-right"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
                    <Text style = {styles1.txtDescription}>General Information</Text>
                    <View style={styles.seperateLine}></View>
                </View>
            </View>
        </View>
    );
}

const styles1 = StyleSheet.create({
    txtDescription: {
        fontSize : 14,
        fontFamily : "Spartan_500Medium",
        textAlign : "justify",
        paddingBottom : 15,
    },
    txtDescripContainer : {
        padding : 15,
    },
    txtTitle : {
        fontSize : 16,
        fontFamily : "Spartan_700Bold",
    }
})
