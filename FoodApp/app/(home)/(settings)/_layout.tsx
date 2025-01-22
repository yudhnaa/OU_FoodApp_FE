import React from 'react';
import {StyleSheet, View} from "react-native";
import {Stack} from "expo-router";

import BackButton from '@/components/home/backButton'

function settingLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#F5CB58'},
            headerShadowVisible: false,
        }}>
            <Stack.Screen
                name="setting"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Settings",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
                }}
            />
            <Stack.Screen
                name="notification"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Notification",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
                }}
            />
            <Stack.Screen
                name="changePassword"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Change Password",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
                }}
            />
            <Stack.Screen
                name="deleteAccount"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Delete Account",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
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
})

export default settingLayout;