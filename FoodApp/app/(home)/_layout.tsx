import {transformFileAsync} from '@babel/core'
import {router, Stack, useRouter} from 'expo-router'
import {View, Text, Pressable, TextInput} from 'react-native'
import {StyleSheet} from 'react-native'
import {Icon} from 'react-native-paper'

import BackButton from '@/components/home/backButton'

export default function HomeLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#F5CB58'},
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            {/* <Stack.Screen name="category/[name]" options={{ headerShown: false }} /> */}
            <Stack.Screen name="category" options={{headerShown: false}}/>

            <Stack.Screen name="profile" options={{headerShown: false}}/>
            <Stack.Screen
                name="myProfile"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "My Profile",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
                }}/>
            <Stack.Screen
                name="deliveryAddress"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Delivery Address",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
                }}
            />
            <Stack.Screen
                name="addAddress"
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Delivery Address",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerLeft: () => (<BackButton />)
                }}
            />

        </Stack>
    )
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