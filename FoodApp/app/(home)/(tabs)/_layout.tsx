import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { usePathname } from 'expo-router';
import SearchHeader from '@/components/home/searchHeader';
import BackButton from '@/components/home/backButton';

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
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="home-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: '#F5CB58' },
          headerShadowVisible: false,
          headerTitle: () => <SearchHeader showBackButton={false} />

        }}
      />
      {/* <Tabs.Screen
        name="food"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="food-outline" color={(pathname.includes('/category/Snacks') || focused) ? "white" : "black"} size={24} />
          ),
          // headerShown: true,
          headerStyle: { backgroundColor: '#F5CB58' },
          // tabBarButton: ({ ...props }) => (
          // <Pressable
          //   {...props}
          //   onPress={() => router.replace('/category/Snacks')}
          // >
          // </Pressable>
          // ),
        }}
      /> */}
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="heart-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: '#F5CB58' },
          title: "My favorite",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          headerLeft: () => (<BackButton />)
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="clipboard-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: '#F5CB58' },
          title: "My orders",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (<BackButton />)
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="headset" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#F5CB58' },
          title: "Help",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (<BackButton />)
        }}
      />
      {/* <Tabs.Screen
        name="category"
        options={{
          href: null,
          headerShown: true,
          headerStyle: { backgroundColor: '#F5CB58' },
          headerTitle: () => <SearchHeader showBackButton={true} />
        }}
      /> */}
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
    backgroundColor: '#F8C471',
    padding: 10,
    paddingTop: 40,
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