// app/(home)/(tabs)/order.tsx
import { View, Text, Pressable, Image } from "react-native";
import { router, Link } from "expo-router";
import { StyleSheet } from "react-native";
import colors from "@/styles/colors";
// import { styles } from "@/components/home/Styles";
const orders = [
    {
        id: 1,
        name: "Order 1",
        price: 29.99,
        date: "2023-10-01",
        image: "assets/images/bestSeller_pic/pic_1.png"
    },
    {
        id: 2,
        name: "Order 2",
        price: 49.99,
        date: "2023-10-02",
        image: "assets/images/bestSeller_pic/pic_1.png"
    },
    {
        id: 3,
        name: "Order 3",
        price: 19.99,
        date: "2023-10-03",
        image: "assets/images/bestSeller_pic/pic_1.png"
    }
];

export default function OrderPage() {
    return (
        <View style={{ backgroundColor: colors.Yellow_Base }}>
            <View style={{ backgroundColor: colors.Yellow_Base }}>
                {orders.length === 0 ? (
                    <>
                        <Image source={require('@/assets/no-orders.png')} style={styles.image} />
                        <Text>You don't have any active orders at this time</Text>
                    </>
                ) : (
                    orders.map((order, index) => (
                        <View key={index} style={styles.orderItem}>
                            <Image source={{ uri: order.image }} style={styles.orderImage} />
                            <Text>{order.name}</Text>
                            <Text>${order.price}</Text>
                            <Text>{order.date}</Text>
                            <Pressable style={styles.cancelButton}>
                                <Text>Cancel Order</Text>
                            </Pressable>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}

// Add styles for the new components
const styles = StyleSheet.create({
    // ... existing styles ...
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    orderImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: colors.Orange_Base,
        padding: 10,
        borderRadius: 5,
    },
});