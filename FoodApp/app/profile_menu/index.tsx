import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
const index = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/profile_menu/profile">Profile</Link>
        </View>
    );
};

export default index;
