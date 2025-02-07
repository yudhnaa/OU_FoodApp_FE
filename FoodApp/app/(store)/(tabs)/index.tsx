import { View,Text,Pressable,StyleSheet } from "react-native";
import { styles } from "@/components/home/Styles";
import { Icon } from "react-native-paper";
import { router } from "expo-router";


export default function HomePageStore() {
    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View className="p-5">
                    <View style={styles.seperateLine}></View>
                    <View className="flex-row justify-between items-center p-5">
                            <Text style = {styles1.txtTitle}>Dish management</Text>
                            <Pressable onPress={() => router.push('/manage')}>
                                <Icon 
                                    source="chevron-right"
                                    color={"#E95322"}
                                    size={28}
                                />
                            </Pressable>
                    </View>
                        {/* <Text style = {styles1.txtDescription}>Support</Text> */}
                    <View style={styles.seperateLine}></View>
                </View>

                <View className="p-5">
                    <View style={styles.seperateLine}></View>
                    <View className="flex-row justify-between items-center p-5">
                        <Text style = {styles1.txtTitle}>Order management</Text>
                        <Pressable onPress={() => router.push('/order_manage')}>
                            <Icon 
                                source="chevron-right"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.seperateLine}></View>
                </View>

                <View className="p-5">
                    <View style={styles.seperateLine}></View>
                    <View className="flex-row justify-between items-center p-5">
                        <Text style = {styles1.txtTitle}>Statistical Report</Text>
                        <Pressable onPress={() => router.push('/statistics')}>
                            <Icon 
                                source="chevron-right"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
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