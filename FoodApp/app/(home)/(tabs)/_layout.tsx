import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabBarLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#E95322',
          borderRadius: 20,
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
          headerShown: false,
        }}
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
    </Tabs>
  );
}