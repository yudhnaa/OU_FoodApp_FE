import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/components/home/Styles";
import APIs, { authApi, endpoints } from "@/configs/APIs";

import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { useEffect, useState, useCallback } from "react";
import { Icon } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { useFoodContext } from "@/app/(store)/manage/FoodDetailsContext";
import { useFocusEffect } from "expo-router";
import { useAuth } from "@/components/AuthContext";


import { useOrderContext } from "./orderDetailsContext";


export default function ManageStore() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { selectedOrder } = useOrderContext();
    const { access_token } = useAuth();

    const loadData = async () => {
        if (page > 0) {
            setLoading(true);

            try {

                const numericId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

                if (isNaN(numericId)) {
                    throw new Error("Invalid ID");
                }

                let url = `${endpoints['store_order_detail'](numericId)}?page=${page}`
                const response = await authApi(access_token).get(url);

                // console.log('Response:', response.data.results);

                if (page > 1) {
                    setData(current => [...current, ...response.data.results]);
                }
                else {
                    setData(response.data.results);
                }

                if (response.data.next === null) {
                    setPage(0);
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
                setLoading(false);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [page])
    );

    const loadMore = () => {
        if (page > 0 && !loading) {
            setPage(page + 1);
        }
    }

    const refresh = () => {
        setPage(1);
        loadData();
    }



    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles1.orderContainer} >
                            <Image source={item.image} style={styles1.image} />
                            <View className="ml-5 flex-1 flex-row justify-between items-center">
                                <View>
                                    <Text style={styles1.orderTitle}>{item.dish_name}</Text>
                                    <Text style={styles1.orderPrice}>Quantity : {item.quantity}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    onEndReached={loadMore}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator size="large" color={colors.Orange_Base} />
                        ) : null
                    } // Hiển thị loading indicator khi đang tải
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                />

                <View className="flex-row justify-between items-center p-5">
                    <Text style={[styles1.orderTitle,{fontSize : 20}]}>Total cost : </Text>
                    <Text style={[styles1.orderTitle,{fontSize : 20}]}> ${selectedOrder.total_cost.toFixed(2)}</Text>
                </View>
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
        fontFamily: "Spartan_700Bold",
    },
    orderPrice: {
        fontSize: 16,
        color: colors.Font,
        marginBottom: 5,
        fontFamily : "Spartan_400Regular",
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
    addDishButton: {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginLeft: 15,
        marginRight: 15,
        width: '40%',
    },
    AddDishText: {
        fontFamily: "Spartan_700Bold",
        color: colors.Font_2,
        padding: 2,
    },
    editButton: {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        // flex : 1,
        flexDirection: 'row',
        marginRight: 10,
        // justifyContent : 'space-between',
    },
});
