import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import fontStyles from '@/styles/fontStyles';
import colors from '@/styles/colors';
import { router } from 'expo-router';
import Logout from './logout';
import APIS, { endpoints } from '@/configs/APIs';
import { useAuth } from "@/components/AuthContext";
import { LoadingOverlay } from "@/components/home/LoadingComponents";

export default function ProfileMenu() {
    const [showLogout, setShowLogout] = React.useState(false);
    const { access_token, clearToken, resetAuthContext } = useAuth()
    const [loading, setLoading] = useState(false);
    const { userInfo } = useAuth()
    const [userName, setUserName] = useState(userInfo.last_name + userInfo.first_name);


    const handleLogout = async () => {
        setLoading(true)
        setShowLogout(false)
        // console.info("Access token:", access_token)
        await APIS.post(endpoints.logout, {
            "token": access_token,
            "client_id": "Ri4D3idLtSGLXUhGcrEyaupmuie1TYWbf5aAqUde",
            "client_secret": "vVkPNBcbuWiy6Y79Ei7JaazdcCRk5yzB3AZtEp655utXJFJdj4HEiTsGaOeOEItF7zXwTgqdfdDREA3B5bF5oyyY5Z5s0IzlKUiPl8vmPYNQRUaZqzIZIxQSX2sn8aib"
        }).then(res => {
            clearToken()
            resetAuthContext()
        }).catch(ex => {
            alert(ex.response.data?.error_description || "Logout failed\nStatus code" + ex.status)
        }).then(() => {
            setLoading(false)

            if (router.canDismiss())
                router.dismissAll()
            router.replace("/loading")
        })
    };

    useEffect(() => {
        if (userName === "") {
            setUserName(userInfo.store_name)
        }
    }, [])

    return (
        <View style={styles.container}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userInfo.avatar_url }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.name}>{userName}</Text>

                    <Text style={styles.email}>{userInfo.email}</Text>
                </View>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('@/assets/images/icons/profile.png')} style={styles.icon} />
                <TouchableOpacity onPressIn={() => {
                    router.push('/myProfile')
                }}>
                    <Text style={styles.menuText}>My Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('@/assets/images/icons/location.png')} style={styles.icon} />
                <TouchableOpacity onPressIn={() => router.push('/deliveryAddress')}>
                    <Text style={styles.menuText}>Delivery Address</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('@/assets/images/icons/payment.png')} style={styles.icon} />
                <TouchableOpacity onPressIn={() => router.push('/paymentMethods')}>
                    <Text style={styles.menuText}>Payment Methods</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('@/assets/images/icons/contact.png')} style={styles.icon} />
                <TouchableOpacity onPressIn={() => router.push('/FaqAndContactUs')}>
                    <Text style={styles.menuText}>FAQ & Contact Us</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
                <Image source={require('@/assets/images/icons/settings.png')} style={styles.icon} />
                <TouchableOpacity onPressIn={() => router.push('/(settings)/setting')}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoutButton}>
                <TouchableOpacity onPressIn={() => setShowLogout(true)}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoutButton}>
                <TouchableOpacity onPressIn={() => {
                    if (router.canDismiss())
                        router.dismissAll()
                    router.replace("/loading")
                }}>
                    <Text style={styles.logoutText}>restart app</Text>
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
        paddingTop: 0,
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