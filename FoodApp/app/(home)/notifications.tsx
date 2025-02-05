import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {styles as bgStyles} from "@/components/home/Styles";
import {Image} from "expo-image";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import colors from "@/styles/colors";
import {router, useFocusEffect} from "expo-router";

// const notifications = [
//     {
//         id: 1,
//         title: "New order",
//         description: "You have a new order",
//     },
//     {
//         id: 2,
//         title: "Order shipped",
//         description: "Your order has been shipped",
//     },
//     {
//         id: 3,
//         title: "Order delivered",
//         description: "Your order has been delivered",
//     },
//     {
//         id: 4,
//         title: "Order cancelled",
//         description: "Your order has been cancelled",
//     },
//     {
//         id: 5,
//         title: "Order returned",
//         description: "Your order has been returned",
//     },
//     {
//         id: 6,
//         title: "New order",
//         description: "You have a new order",
//     },
//     {
//         id: 7,
//         title: "Order shipped",
//         description: "Your order has been shipped",
//     },
//     {
//         id: 8,
//         title: "Order delivered",
//         description: "Your order has been delivered",
//     },
//     {
//         id: 9,
//         title: "Order cancelled",
//         description: "Your order has been cancelled",
//     },
//     {
//         id: 10,
//         title: "Order returned",
//         description: "Your order has been returned",
//     },
//     {
//         id: 11,
//         title: "New order",
//         description: "You have a new order",
//     },
//     {
//         id: 12,
//         title: "Order shipped",
//         description: "Your order has been shipped",
//     },
//     {
//         id: 13,
//         title: "Order delivered",
//         description: "Your order has been delivered",
//     },
//     {
//         id: 14,
//         title: "Order cancelled",
//         description: "Your order has been cancelled",
//     },
//     {
//         id: 15,
//         title: "Order returned",
//         description: "Your order has been returned",
//     },
// ]

type Notification = {
    id: number;
    title: string;
    message: string;
    is_read: boolean;
}

function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {access_token} = useAuth();

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            // fetch notifications
            const res = await authApi(access_token).get(endpoints.notification);
            setNotifications(res.data);
        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setLoading(false);
        }
    }

    const markAsRead = async (id: number) => {
        try {
            setLoading(true);

            // mark as read
            await authApi(access_token).patch(endpoints.notification + id + "/", {
                is_read: true
            }).then(res => {
                notifications.find(item => item.id === id)!.is_read = true;
            }).catch(ex => {
                alert(ex.response.data?.error_description || "Loading failed\nStatus code" + ex.status)
            }).finally(() => {
                setLoading(false);
            })

        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchNotifications();
        }, [])
    );

    return (
        <View style={bgStyles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View style={bgStyles.bodyPage}>
                    <FlatList
                        data={notifications}
                        renderItem={({item}) => (
                            <View style={[styles.container, {backgroundColor: item.is_read ? "white": colors.Yellow_2}]}>
                                <Image source={require("@/assets/images/icons/ico_notification.svg")} style={styles.image} contentFit={"contain"}></Image>
                                <TouchableOpacity className="ml-5 flex-1" onPress={() => markAsRead(item.id)}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.details}>{item.message}</Text>
                                </TouchableOpacity>
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