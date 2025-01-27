import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import colors from '@/styles/colors';
import fontStyles from "@/styles/fontStyles";
import React from "react";

export default function LoadingComponent() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.Orange_Base}/>
        </View>
    );
}

export const LoadingOverlay = () => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="white"/>
            <Text style={[fontStyles.Title, {color: colors.Font_2, fontSize: 15}]}>Your information's are coming...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    }
})