import {View, Text, Pressable, FlatList} from "react-native";
import {Image} from "expo-image";
import {router, Link} from "expo-router";
import {StyleSheet} from "react-native";
import colors from "@/styles/colors";
import {styles} from "@/components/home/Styles";
import fontsStyles from "@/styles/fontStyles";
import {useState} from "react";
import {Tabs} from "expo-router";

const orders = [
    {
        id: 1,
        name: "Strawberry shake",
        price: 20.00,
        date: "29 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        items: 2,
        status: "active"
    },
    {
        id: 2,
        name: "Blackberry shake",
        price: 23.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        items: 3,
        status: "completed"
    },
    {
        id: 3,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
        status: "cancelled"
    },
    {
        id: 4,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
        status: "active"
    },
    {
        id: 5,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
        status: "completed"
    },
]
export default function OrderPage() {

    const [filteredOrders, setFilteredOrders] = useState<string>("active");
    const handlePress = (item: { status: string }) => {
        switch (item.status) {
            case "active":
                return router.push('/order/orderCancel');
            case "completed":
                return router.push('/order/reviewOrder');
            case "cancelled":
                return console.log(item.status)
        }
    }

    const hasOrders = orders.filter(order => order.status === filteredOrders).length > 0;

    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles1.tabContainer}>
                    <Pressable
                        style={[filteredOrders === "active" ? styles1.activeTab : styles1.inactiveTab, styles1.tab]}
                        onPress={() => {
                            setFilteredOrders("active")
                        }}>
                        <Text
                            style={filteredOrders === "active" ? styles1.tabTextActive : styles1.tabTextInactive}>Active</Text>
                    </Pressable>
                    <Pressable
                        style={[filteredOrders === "completed" ? styles1.activeTab : styles1.inactiveTab, styles1.tab]}
                        onPress={() => {
                            setFilteredOrders("completed")
                        }}>
                        <Text
                            style={filteredOrders === "completed" ? styles1.tabTextActive : styles1.tabTextInactive}>Completed</Text>
                    </Pressable>
                    <Pressable
                        style={[filteredOrders === "cancelled" ? styles1.activeTab : styles1.inactiveTab, styles1.tab]}
                        onPress={() => {
                            setFilteredOrders("cancelled")
                        }}>
                        <Text
                            style={filteredOrders === "cancelled" ? styles1.tabTextActive : styles1.tabTextInactive}>Cancelled</Text>
                    </Pressable>
                </View>
                {hasOrders ? (
                    <FlatList
                        data={orders.filter(order => order.status === filteredOrders)}
                        renderItem={({item}) => (
                            <View className="m-5" style={styles1.orderContainer}>
                                <Image source={item.image} style={styles1.image}/>
                                <View className="ml-5 flex-1">
                                    <Text style={styles1.orderTitle}>{item.name}</Text>
                                    <Text style={styles1.orderPrice}>${item.price}</Text>
                                    <View className="flex-row justify-between">
                                        <Text style={styles1.orderDetails}>{item.date}</Text>
                                        <Text style={styles1.orderDetails}>{item.items} items</Text>
                                    </View>
                                    {(item.status === "completed" || item.status === "active") && (
                                        <View className="flex-row justify-between">
                                            <Pressable style={styles1.cancelButton}
                                                       onPress={() => handlePress(item)}>
                                                <Text style={{
                                                    color: colors.Font_2, ...fontsStyles.subtitulo,
                                                    fontSize: 13
                                                }}>
                                                    {item.status === "completed" ? "Leave a review" : "Cancel Order"}
                                                </Text>
                                            </Pressable>
                                            <Pressable style={styles1.trackButton}>
                                                <Text style={{
                                                    color: colors.Orange_Base, ...fontsStyles.subtitulo,
                                                    fontSize: 13
                                                }}>
                                                    {item.status === "completed" ? "Order again" : "Track Driver"}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                    {item.status === "cancelled" && (
                                        <View className={"flex-row items-center justify-start"}>
                                            <Image source={require('@/assets/images/icons/cancelled.png')}
                                                   style={{width: 15, height: 15}}/>
                                            <Text style={{
                                                color: colors.Orange_Base, ...fontsStyles.subtitulo,
                                                fontSize: 13,
                                                paddingLeft: 5,
                                            }}>Order cancelled</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                    />

                ) : (
                    <View style={styles1.emptyState}>
                        <Image source={require('@/assets/images/icons/empty_order.png')} style={styles1.emptyImage}/>
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
});
