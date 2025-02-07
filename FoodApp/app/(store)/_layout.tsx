// app/(store)/_layout.tsx
import {router, Stack, useRouter} from 'expo-router'
import {View, Text, Pressable, TextInput} from 'react-native'
import {StyleSheet} from 'react-native'
import {Icon} from 'react-native-paper'
import BackButton from '@/components/home/backButton'
import colors from "@/styles/colors";
import { CartProvider } from '@/components/home/cartContext'

export default function StoreLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#F5CB58'},
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="manage" options={{headerShown: false}}/>
            <Stack.Screen name="order_manage" options={{headerShown: false}}/>
        </Stack>
    );
}