import React from 'react';
import {Tabs} from 'expo-router';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {usePathname} from 'expo-router';
import SearchHeader from '@/components/home/searchHeader';

export default function TabBarLayout() {
    const pathname = usePathname();
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#E95322',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 60,
                    overflow: 'hidden',
                    flex: 1,
                    justifyContent: 'center',
                },
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialCommunityIcons name="home-outline" color={focused ? "white" : "black"} size={24}/>
                    ),
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    headerShadowVisible: false,
                    headerTitle: () => <SearchHeader showBackButton={false}/>
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialCommunityIcons name="heart-outline" color={focused ? "white" : "black"} size={24}/>
                    ),
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "My favorite",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                    // headerLeft: () => (<BackButton />)
                }}
            />
            <Tabs.Screen
                name="follow"
                options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialCommunityIcons name="account-heart-outline" color={focused ? "white" : "black"}
                                                size={24}/>
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialCommunityIcons name="clipboard-outline" color={focused ? "white" : "black"} size={24}/>
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    tabBarIcon: ({focused}) => (
                        <MaterialCommunityIcons name="headset" color={focused ? "white" : "black"} size={24}/>
                    ),
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    title: "Help",
                    headerTitleAlign: "center",
                    headerTitleStyle: styles.headerTitle,
                    // headerLeft: () => (<BackButton />)
                }}
            />

        </Tabs>
    );
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
        color: "#f8f8f8",
    },
    searchInput: {
        height: 25,
        fontSize: 12,
        width: 100,
    },
})