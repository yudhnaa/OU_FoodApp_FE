import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/components/home/Styles";
import APIs, { authApi, endpoints } from "@/configs/APIs";


import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { useEffect, useState, useCallback } from "react";
import { Icon } from "react-native-paper";
import { router } from "expo-router";
// import {useAuth} from "@/components/AuthContext";
import { useFocusEffect } from "expo-router";
import { useAuth } from "@/components/AuthContext";
import { useOrderContext } from "./orderDetailsContext";


export default function Statistics() {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { access_token } = useAuth();
    const { setSelectedOrder } = useOrderContext();


    const loadData = async () => {
        if(page > 0){
            setLoading(true);
            try{
                let url = `${endpoints['store_orders']}?page=${page}`;
                const response = await authApi(access_token).get(url);

                if(page > 1){
                    setData(current => [...current, ...response.data.results]);
                }

                else{
                    setData(response.data.results);
                }

                if(response.data.next === null){
                    setPage(0);
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
    }

    const updateOrder = async (id: number) => {
        try{
            const response = await authApi(access_token).patch(endpoints['store_order_update'](id));

            if(response.status === 200){
                setData(prevData => prevData.filter(item => item.id !== id));
                alert('Order updated successfully');
            }
            else{
                alert('Failed to update order');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadData();
        },[page])
    )

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
                            <View className="flex-row items-center">
                                <Icon
                                    source = "clipboard-text-outline"
                                    size = {60}
                                    color = {colors.Orange_Base}
                                />
                            </View>
                            <View className="ml-5 flex-1 flex-row justify-between items-center">
                                <View>
                                    <Text style={styles1.orderTitle}>Order ID : {item.id}</Text>
                                    <Text style={styles1.orderPrice}>Price : ${item.total_cost.toFixed(2)}</Text>
                                    <Text style={styles1.orderPrice}>Status : {item.order_status}</Text>

                                    <View className={'flex-row flex-1 w-[100%]'}>
                                        <Pressable style={[styles1.editButton]} onPress={() => {
                                            setSelectedOrder(item);
                                            router.push(`/order_manage/${item.id.toString()}`);
                                        }}>
                                            <Text style={styles1.AddDishText}>Detail</Text>
                                            <View className={'pl-2'}>
                                                <Icon
                                                    source="pencil-outline"
                                                    color={colors.Font_2}
                                                    size={20}
                                                />
                                            </View>
                                        </Pressable>

                                        <Pressable style={[styles1.editButton]} onPress={() => {
                                            updateOrder(item.id);
                                        }}>
                                            <Text style={styles1.AddDishText}>Confirm</Text>
                                            <View className={'pl-2'}>
                                                <Icon
                                                    source="check"
                                                    color={colors.Font_2}
                                                    size={20}
                                                />
                                            </View>
                                        </Pressable>
                                    </View>
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
            </View>
        </View>
    );
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