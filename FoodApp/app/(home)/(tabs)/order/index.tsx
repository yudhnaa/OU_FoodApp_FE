import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Image } from "expo-image";
import { router, Link, useFocusEffect } from "expo-router";
import { StyleSheet } from "react-native";
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";
import fontsStyles from "@/styles/fontStyles";
import { useCallback, useEffect, useState } from "react";
import { Tabs } from "expo-router";
import APIs, { authApi, endpoints } from "@/configs/APIs";
import { useAuth } from "@/components/AuthContext";
import { LoadingOverlay } from "@/components/home/LoadingComponents";
import { IconButton } from "react-native-paper";

export default function OrderPage() {
    const [loading, setLoading] = useState<boolean>(true);

    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<string>("active");
    const [hasOrders, setHasOrders] = useState<boolean>(false);

    const { access_token } = useAuth()

    const handlePress = (item: { status: string }) => {
        switch (item.status) {
            case "active":
                router.push({
                    pathname: '/order/orderCancel',
                    params: {
                        orderInfo: JSON.stringify(item)
                    }
                })
                return
            case "completed":
                router.push({
                    pathname: '/order/reviewOrder',
                    params: {
                        orderInfo: JSON.stringify(item)
                    }
                })
                return
            case "cancelled":
                return console.log(item.status)
            case "not paid":
                router.push({
                    pathname: '/payForOrder',
                    params: {
                        orderInfo: JSON.stringify(item),
                        isNewOrder: 'false'
                    }
                })
                return
            case "reviewed":
                return console.log(item.status)
        }
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            await authApi(access_token).get(endpoints['order_by_type']).then(res => {
                setOrders(res.data.results)
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 200)
            });
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    )

    useEffect(() => {
        setHasOrders(orders.length > 0)
    }, [orders]);

    return (
        <View style={styles.backGround}>
            {loading && <LoadingOverlay />}
            <View style={styles.bodyPage}>
                <View style={styles1.tabContainer}>
                    <TouchableOpacity
                        style={[filteredOrders === "active" ? styles1.activeTab : styles1.inactiveTab, styles1.tab]}
                        onPress={() => {
                            setFilteredOrders("active")
                        }}>
                        <Text
                            style={filteredOrders === "active" ? styles1.tabTextActive : styles1.tabTextInactive}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[filteredOrders === "completed" ? styles1.activeTab : styles1.inactiveTab, styles1.tab]}
                        onPress={() => {
                            setFilteredOrders("completed")
                        }}>
                        <Text
                            style={filteredOrders === "completed" ? styles1.tabTextActive : styles1.tabTextInactive}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[filteredOrders === "canceled" ? styles1.activeTab : styles1.inactiveTab, styles1.tab]}
                        onPress={() => {
                            setFilteredOrders("canceled")
                        }}>
                        <Text
                            style={filteredOrders === "canceled" ? styles1.tabTextActive : styles1.tabTextInactive}>Cancelled</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[filteredOrders === "not paid" ? styles1.activeTab : styles1.inactiveTab, styles1.tab, { marginTop: 10 }]}
                        onPress={() => {
                            setFilteredOrders("not paid")
                        }}>
                        <Text
                            style={filteredOrders === "not paid" ? styles1.tabTextActive : styles1.tabTextInactive}>Not
                            paid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[filteredOrders === "reviewed" ? styles1.activeTab : styles1.inactiveTab, styles1.tab, { marginTop: 10 }]}
                        onPress={() => {
                            setFilteredOrders("reviewed")
                        }}>
                        <Text
                            style={filteredOrders === "reviewed" ? styles1.tabTextActive : styles1.tabTextInactive}>Reviewed</Text>
                    </TouchableOpacity>
                </View>
                {hasOrders ? (
                    <FlatList
                        data={orders.filter(order => order.status === filteredOrders)}
                        keyExtractor={(item) => item.id.toString()} // Ensure each key is unique
                        renderItem={({ item }) => (
                            <View className="m-5" style={styles1.orderContainer}>
                                <Image source={{ uri: item.image }} style={styles1.image} />
                                <View className="ml-5 flex-1">
                                    <Text style={styles1.orderTitle}>{item.name}</Text>
                                    <Text style={styles1.orderPrice}>${item.price}</Text>
                                    <View className="flex-row justify-between">
                                        <Text style={styles1.orderDetails}>{item.date}</Text>
                                        <Text style={styles1.orderDetails}>{item.quantity} items</Text>
                                    </View>
                                    {(item.status === "completed" || item.status === "active") && (
                                        <View className="flex-row justify-between">
                                            <TouchableOpacity style={styles1.cancelButton}
                                                onPress={() => handlePress(item)}>
                                                <Text style={{
                                                    color: colors.Font_2, ...fontsStyles.subtitulo,
                                                    fontSize: 13
                                                }}>
                                                    {item.status === "completed" ? "Leave a review" : "Cancel Order"}
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity>
                                                <IconButton icon={"message-badge-outline"} size={20}
                                                    iconColor={colors.Orange_Base}>
                                                </IconButton>
                                            </TouchableOpacity>

                                        </View>
                                    )}
                                    {item.status === "canceled" && (
                                        <View className={"flex-row items-center justify-start"}>
                                            <Image source={require('@/assets/images/icons/cancelled.png')}
                                                style={{ width: 15, height: 15 }} />
                                            <Text style={{
                                                color: colors.Orange_Base, ...fontsStyles.subtitulo,
                                                fontSize: 13,
                                                paddingLeft: 5,
                                            }}>Order cancelled</Text>
                                        </View>
                                    )}
                                    {(item.status === "not paid") && (
                                        <View className="flex-row justify-between">
                                            <TouchableOpacity style={styles1.cancelButton}
                                                onPress={() => handlePress(item)}>
                                                <Text style={{
                                                    color: colors.Font_2, ...fontsStyles.subtitulo,
                                                    fontSize: 13
                                                }}>
                                                    Pay now
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles1.trackButton}
                                                onPress={() => handlePress({ status: "active" })}>
                                                <Text style={{
                                                    color: colors.Orange_Base, ...fontsStyles.subtitulo,
                                                    fontSize: 13
                                                }}>
                                                    Cancel Order
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                    />

                ) : (
                    <View style={styles1.emptyState}>
                        <Image source={require('@/assets/images/icons/empty_order.png')} style={styles1.emptyImage} />
                        <Text style={styles1.emptyText}>You don't have any active orders at this time</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles1 = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flexWrap: 'wrap',
        marginHorizontal: 10,
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
});