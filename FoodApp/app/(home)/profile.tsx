import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import fontStyles from '@/styles/fontStyles';
import colors from '@/styles/colors';

export default function ProfileMenu() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: "10%" }}>
                <Image
                    source={require("../../assets/images/avt.png")}
                    style={{ width: 70, height: 70, borderRadius: 50, marginRight: "5%" }}
                />
                <View>
                    <Text style={styles.name}>John Smith</Text>
                    <Text style={styles.email}>Loremipsum@email.com</Text>
                </View>
            </View>

            {/* <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/order.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>My Orders</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/profile.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>My Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/location.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>Delivery Address</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/payment.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>Payment Methods</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/contact.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>Contact Us</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/help.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>Help & FAQs</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require("../../assets/images/icons/settings.png")} style={styles.icon} />
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoutButton}>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const menuItems = [
    'My Orders',
    'My Profile',
    'Delivery Address',
    'Payment Methods',
    'Contact Us',
    'Help & FAQs',
    'Settings',
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Orange_Base,
        padding: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        color: colors.Font_2,
        marginVertical: 10,
    },
    email: {
        fontSize: 16,
        color: colors.Yellow_2,
        marginBottom: 20,
    },
    menuItem: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD8C7',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "flex-end"
    },
    menuText: {
        ...fontStyles.subtitulo,
        color: colors.Yellow_2,
        marginLeft: 10,
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    logoutText: {
        ...fontStyles.subtitulo,
        color: colors.Yellow_2,
    },
    icon: {
        width: 35,
        height: 35,
        marginHorizontal: 20,
    },
});
