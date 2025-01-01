import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import BackButton from '@/components/home/backButton'

export default function OrderLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#F5CB58' },
                title: "My orders",
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitle,
                headerLeft: () => (<BackButton />),
                headerShadowVisible: false
            }} />

            <Stack.Screen name="order_cancel" options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#F5CB58' },
                title: "Cancel orders",
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitle,
                headerLeft: () => (<BackButton />),
                headerShadowVisible: false

            }} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#F8F8F8",
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
        fontFamily: "Spartan_700Bold"
    },
    header: {
        backgroundColor: '#F8C471', // Màu nền của header
        padding: 10,
        paddingTop: 40, // Để tạo khoảng cách cho status bar
    },
    headerTitle: {
        fontFamily: "Spartan_700Bold",
        fontSize: 28,
        fontWeight: "700",
        color: "#f8f8f8",
    },
    searchInput: {
        height: 25,
        fontSize: 12,
        width: 100,
    },
})