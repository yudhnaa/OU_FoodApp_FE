import React from 'react';
import {StyleSheet, View} from "react-native";
import {Stack} from "expo-router";
import BackButton from "@/components/home/backButton";

function CartLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#F5CB58'},
            headerShadowVisible: false,
        }}>
            <Stack.Screen
                name="checkout"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Confirm Order",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton/>)
                }}
            />
            <Stack.Screen
                name="payment"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Payment",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton/>)
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#F8F8F8",
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F8C471', // Màu nền của header
        padding: 10,
        paddingTop: 40, // Để tạo khoảng cách cho status bar
    },
    searchInput: {
        height: 25,
        fontSize: 12,
        width: 100,
    },
    txtGreeting: {
        fontSize: 30,
        fontFamily: "Spartan_700Bold"
    },
    headerTitle: {
        fontFamily: "Spartan_700Bold",
        fontSize: 28,
        fontWeight: "700",
        color: "#f8f8f8",
    },
});

export default CartLayout;