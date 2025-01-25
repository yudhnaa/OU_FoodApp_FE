import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {Image} from 'expo-image';
import fontStyles from '@/styles/fontStyles';
import colors from '@/styles/colors';
import {router} from 'expo-router';
import Button from '@/components/home/button';
import Logout from './logout';

export default function ProfileMenu() {
    const [showLogout, setShowLogout] = React.useState(false);

    const handleLogout = () => {
        alert('Logged out');
        setShowLogout(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../../assets/images/avt.png')}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.name}>John Smith</Text>
                    <Text style={styles.email}>Loremipsum@email.com</Text>
                </View>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('../../assets/images/icons/profile.png')} style={styles.icon}/>
                <TouchableOpacity onPress={() => router.push('/myProfile')}>
                    <Text style={styles.menuText}>My Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('../../assets/images/icons/location.png')} style={styles.icon}/>
                <TouchableOpacity onPress={() => router.push('/deliveryAddress')}>
                    <Text style={styles.menuText}>Delivery Address</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('../../assets/images/icons/payment.png')} style={styles.icon}/>
                <TouchableOpacity onPress={() => router.push('/paymentMethods')}>
                    <Text style={styles.menuText}>Payment Methods</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('../../assets/images/icons/contact.png')} style={styles.icon}/>
                <TouchableOpacity onPress={() => router.push('/FaqAndContactUs')}>
                    <Text style={styles.menuText}>FAQ & Contact Us</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('../../assets/images/icons/settings.png')} style={styles.icon}/>
                <TouchableOpacity onPress={() => router.push('/(settings)/setting')}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoutButton}>
                <TouchableOpacity onPress={() => setShowLogout(true)}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <Logout
                visible={showLogout}
                onConfirm={handleLogout}
                onCancel={() => setShowLogout(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Orange_Base,
        padding: 20,
        paddingTop:0,
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: '10%',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: '5%',
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
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
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