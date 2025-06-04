import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import Header from '@/components/store/header';

export default function TabBarStoreLayout() {
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
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="home-outline" color={focused ? "white" : "black"} size={24} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: '#F5CB58' },
          headerShadowVisible: false,
          headerTitle: () => <Header showBackButton={false} />
        }}
      />
    </Tabs>
  )
}