import React from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {styles as bgStyles} from "@/components/home/Styles";
import {Image} from "expo-image";

const notifications = [
    {
        id: 1,
        title: "New order",
        description: "You have a new order",
    },
    {
        id: 2,
        title: "Order shipped",
        description: "Your order has been shipped",
    },
    {
        id: 3,
        title: "Order delivered",
        description: "Your order has been delivered",
    },
    {
        id: 4,
        title: "Order cancelled",
        description: "Your order has been cancelled",
    },
    {
        id: 5,
        title: "Order returned",
        description: "Your order has been returned",
    },
    {
        id: 6,
        title: "New order",
        description: "You have a new order",
    },
    {
        id: 7,
        title: "Order shipped",
        description: "Your order has been shipped",
    },
    {
        id: 8,
        title: "Order delivered",
        description: "Your order has been delivered",
    },
    {
        id: 9,
        title: "Order cancelled",
        description: "Your order has been cancelled",
    },
    {
        id: 10,
        title: "Order returned",
        description: "Your order has been returned",
    },
    {
        id: 11,
        title: "New order",
        description: "You have a new order",
    },
    {
        id: 12,
        title: "Order shipped",
        description: "Your order has been shipped",
    },
    {
        id: 13,
        title: "Order delivered",
        description: "Your order has been delivered",
    },
    {
        id: 14,
        title: "Order cancelled",
        description: "Your order has been cancelled",
    },
    {
        id: 15,
        title: "Order returned",
        description: "Your order has been returned",
    },
]

function Notifications() {
    return (
        <View style={bgStyles.backGround}>
            <View style={bgStyles.bodyPage}>
                    <FlatList
                        data={notifications}
                        renderItem={({item}) => (
                            <View style={styles.container}>
                                <Image source={require("@/assets/images/icons/ico_notification.svg")} style={styles.image} contentFit={"contain"}></Image>
                                <View className="ml-5 flex-1">
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.details}>{item.description}</Text>
                                </View>
                            </View>
                        )}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
});

export default Notifications;