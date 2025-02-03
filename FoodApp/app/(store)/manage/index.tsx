import { View, Text, Pressable, StyleSheet, FlatList, } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/components/home/Styles";
import APIs, { endpoints } from "@/configs/APIs";
import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { useEffect, useState } from "react";
import { Icon } from "react-native-paper";
import { router } from "expo-router";
import { useFoodContext} from "@/app/(store)/manage/FoodDetailsContext";
// import {useAuth} from "@/components/AuthContext";



export default function ManageStore() {

    const [data, setData] = useState<any[]>([]);
    const {setSelectedFood} = useFoodContext();
    // const {access_token} = useAuth();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await APIs.get(endpoints['store_dishes']);

                // const response = await authApi(access_token).get(endpoints['store_dishes']);

                setData(response.data);
            }
            catch (e) {
                console.log(e);
            }
        };
        loadData();
    }, []);


    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <Pressable style={styles1.addDishButton} onPress={() => router.push("/manage/createDish")}>
                    <View className="flex-row justify-between items-center">
                        <Text style={styles1.AddDishText}>Add new dish</Text>
                        <Icon
                            source="plus-circle-outline"
                            color={colors.Font_2}
                            size={28}
                        />
                    </View>
                </Pressable>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View className="m-3">
                            <Pressable style={styles1.orderContainer} onPress={() => {
                                setSelectedFood(item);
                                router.push(`/manage/${item.id.toString()}`)
                            }}>
                                <Image source={item.image} style={styles1.image} />
                                <View className="ml-5 flex-1 flex-row justify-between items-center">
                                    <View>
                                        <Text style={styles1.orderTitle}>{item.name}</Text>
                                        <Text style={styles1.orderPrice}>Price : ${item.price}</Text>
                                        <View className="flex-row justify-between">
                                            <Text style={styles1.orderDetails}>{item.description}</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Icon
                                            source="chevron-right"
                                            color={"#E95322"}
                                            size={28}
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles1 = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        width: "30%",
        borderRadius: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.Orange_Base,
    },
    inactiveTab: {
        backgroundColor: colors.Orange_2,
    },
    tabTextActive: {
        ...fontsStyles.TextInputField,
        color: colors.Font_2,

    },
    tabTextInactive: {
        ...fontsStyles.TextInputField,
        color: colors.Orange_Base,
    },

    orderContainer: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        // marginBottom: 10,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderPrice: {
        fontSize: 16,
        color: colors.Font,
        marginBottom: 5,
    },
    orderDetails: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    trackButton: {
        backgroundColor: colors.Orange_2,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyImage: {
        width: 150,
        height: 170,
        alignSelf: "center",
        marginVertical: "20%",
    },
    emptyText: {
        color: colors.Orange_Base,
        ...fontsStyles.subtitulo,
        fontSize: 30,
        textAlign: "center",
        width: "80%",
    },
    addDishButton : {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    AddDishText : {
        fontFamily : "Spartan_700Bold",
        color : colors.Font_2,
    }
});
