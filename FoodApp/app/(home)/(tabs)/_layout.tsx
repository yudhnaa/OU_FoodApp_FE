import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View,Text} from 'react-native';
import { StyleSheet } from 'react-native';

export default function TabBarLayout() {
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
          headerTitle: () => (
            <View className="flex-1 flex-col">
                <Text style={{fontSize: 25, fontFamily: "Spartan_700Bold",color : "white"}}>Good Morning</Text>
                <Text style={{fontSize: 12, fontFamily: "Spartan_700Bold",color : "#e95322"}}>Rise and Shine! It's breakfast time</Text>
            </View>
          )}}
      />
      <Tabs.Screen
        name="food"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="food-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="heart-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="clipboard-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          tabBarIcon: ({ color, size, focused  }) => (
            <MaterialCommunityIcons name="headset" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          href : null,
          headerShown: false,
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
    marginTop: 30,
    marginBottom: 20
  },
  header: {
      backgroundColor: '#F8C471', // Màu nền của header
      padding: 10,
      paddingTop: 40, // Để tạo khoảng cách cho status bar
    },
  searchInput: {
      height: 25,
      fontSize : 12,
      width: 100,
  },
  txtGreeting:{
      fontSize:30,
      fontFamily : "Spartan_700Bold"
  }
})