import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Image,Text } from 'react-native';
import { Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Cart from '@/app/(home)/(cart)/cart';
import colors from '@/styles/colors';

type SearchHeaderProps = {
    showBackButton?: boolean;
};

export default function Header({ showBackButton = false }: SearchHeaderProps) {
    const router = useRouter();
    // const [showCart, setShowCart] = React.useState(false);

    return (
        <View
            className="flex-1 flex-row justify-between items-center mt-2"
            style={{ zIndex: 999, elevation: 10, position: "relative" }}
        >
            <View
                style={{ position: "relative" }}
            >
                <View className="ml-2 mr-2 flex-col ">
                    <Text style={styles.headerText}>
                            Store Management
                    </Text>
                    <Text style={styles.subheaderText}>Welcome to the Management page</Text>
                </View>
            </View>
            <View className="ml-12 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={() => router.push('/notifications')}>
                    <Icon source="bell-outline" color="#E95322" size={28} />
                </Pressable>
            </View>
            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={() => router.push('/profile')}>
                    <Icon source="account-outline" color="#E95322" size={28} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        backgroundColor: "white",
        borderRadius: 12,
    },
    filter_button: {
        backgroundColor: '#E95322',
        borderRadius: 18,
        padding: 3,
    },
    headerText:{
        fontSize: 20,
        color: colors.Font_2,
        fontFamily : 'Spartan_700Bold',
    },
    subheaderText:{
        fontSize: 12,
        color: colors.Orange_Base,
        fontFamily : 'Spartan_500Medium',
    }
});