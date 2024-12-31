import React from 'react';
import { Stack } from 'expo-router';
import { Icon } from 'react-native-paper';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import SearchHeader from '@/components/home/searchHeader';

export default function StackLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#F5CB58' },
      headerShown: true,
      headerTitle: () => <SearchHeader showBackButton={true} />
    }}>
    </Stack>
  );
}