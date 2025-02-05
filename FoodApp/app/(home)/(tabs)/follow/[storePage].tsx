import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles as bgStyles } from "@/components/home/Styles";
import { LoadingOverlay } from "@/components/home/LoadingComponents";
import { authApi, endpoints } from "@/configs/APIs";
import { useAuth } from "@/components/AuthContext";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import Button from "@/components/home/button";
import BackButton from "@/components/home/backButton";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import Toast from "react-native-toast-message";
import { Linking } from 'react-native';


type StoreInfo = {
    id: number;
    date_joined: string;
    is_active: boolean;
    store_name: string,
    avatar: string,
    follower: number,
    address: string,
};

interface Dish {
    id: number;
    name: string;
    price: number;
    food_type: number;
    description: string | null;
    image: string;
    food_type_id: number;
    store_id: number;
}

function StorePage() {
    const { access_token, userInfo } = useAuth()
    const [loading, setLoading] = useState(false);
    const { storePage, followId, isFollowed } = useLocalSearchParams()
    const [followingId, setFollowingId] = useState(followId);
    const parsedIsFollowed = isFollowed === "true";
    const [isFollowing, setisFollowing] = useState(parsedIsFollowed);
    const [storeInfo, setStoreInfo] = useState<StoreInfo>({
        id: 0,
        date_joined: "",
        is_active: false,
        store_name: "",
        avatar: "",
        follower: 0,
        address: "",
    })

    const [dish, setDish] = useState<Dish[]>([]);

    const fetchStoreInfo = async () => {
        setLoading(true);
        try {
            await authApi(access_token).get(`${endpoints.get_store}${storePage}/`).then((res) => {
                console.log("Store info:", res.data);
                setStoreInfo(res.data);
            }).catch((ex: any) => {
                alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
            })
            // setStoreInfo()
        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }

    const fetchDishes = async () => {
        setLoading(true);
        try {
            await authApi(access_token).get(`${endpoints.dish_by_store}${storePage}/`).then((res) => {
                console.log(res.data.results);
                setDish(res.data.results);
            }).catch((ex: any) => {
                alert(ex.response?.data?.error_description || ex.response?.data?.message || `Loading failed\nStatus code: ${ex.status}`);
            })
        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }

    const unFollow = async (id: number) => {
        setLoading(true);
        await authApi(access_token).delete(`${endpoints.unfollow_store}${id}/`).then((res) => {
            // alert("Unfollowed successfully");
            setisFollowing(false);
            setFollowingId('0')
            // router.dismiss();
        }).catch((ex: any) => {
            alert(ex.response?.data?.error_description || `Unfollow failed\nStatus code: ${ex.status}`);
            console.error(ex)
        }).finally(() => {
            setLoading(false);
        })
    }

    const follow = async () => {
        try {
            await authApi(access_token).post(endpoints.follow_store, {
                store: storeInfo.id,
                guest: userInfo.id
            }).then((res) => {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Followed successfully 👌',
                })
                setisFollowing(true);
                setFollowingId(res.data.id);

            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to follow. Please try again.',
                });
            })

        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = async (id: any) => {
        try {
            const payload = {
                dish_id: id,
                quantity: 1,
                toppings: [],
            };

            console.log("Body 'add to cart' api:", payload)


            await authApi(access_token).post(endpoints["add-to-cart"], payload).then((res) => {
                if (res.status === 201) {
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Added to cart successfully 👌',
                    })
                }

            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to add to cart. Please try again.',
                });
            })

        } catch (error) {
            console.log(error);
        }
    };

    const openInGoogleMaps = (address: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch((err) => console.error('Error opening maps:', err));
    };

    useEffect(() => {
        // console.info("StorePage:", storePage);
        // console.info("followId:", followId);
        fetchStoreInfo();
        fetchDishes()
    }, []);

    return (
        <View style={bgStyles.backGround}>
            <Stack.Screen options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#F5CB58' },
                title: "Store",
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitle,
                headerShadowVisible: false,
                headerLeft: () => (<BackButton />)
            }}></Stack.Screen>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View style={bgStyles.bodyPage}>
                <View style={styles.storeInfoContainer}>
                    <View style={styles.headerSection}>
                        <Image
                            source={storeInfo.avatar ? { uri: storeInfo.avatar } : require("@/assets/images/avt_square.png")}
                            style={styles.storeAvatar}
                        />
                        <View style={styles.mainInfo}>
                            <Text style={styles.storeName}>{storeInfo?.store_name}</Text>
                            <View className='flex-row'>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.statsText}>👥 {storeInfo?.follower} followers</Text>
                                    <Text style={styles.statsText}>•</Text>
                                    <Text style={styles.statsText}>📅 Joined {new Date(storeInfo?.date_joined).toLocaleDateString()}</Text>
                                    <TouchableOpacity
                                        style={styles.addressButton}
                                        onPress={() => openInGoogleMaps(storeInfo?.address)}
                                    >
                                        <Text style={styles.addressText}>📍 {storeInfo?.address}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.followButtonContainer}>
                                    {isFollowing ? (
                                        <Button
                                            text={"Unfollow"}
                                            onPress={() => unFollow(Number.parseInt(followingId.toString()))}
                                            disabled={loading}
                                            buttonColor={colors.Orange_2}
                                            textColor={colors.Font}
                                        />
                                    ) : (
                                        <Button
                                            text={"Follow"}
                                            onPress={follow}
                                            disabled={loading}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>


                </View>
                <View>
                    <Text style={[fontStyles.Title, { margin: 10 }]}>Danh sách các món ăn</Text>
                </View>
                <FlatList
                    data={dish}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.dishItem}>
                            <View style={styles.dishImageContainer}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.dishImage}
                                />
                            </View>
                            <View style={styles.dishInfo}>
                                <Text style={styles.dishName}>{item.name}</Text>
                                <Text style={styles.dishDescription} numberOfLines={2}>
                                    {item.description || 'No description available'}
                                </Text>
                                <Text style={styles.dishPrice}>${item.price.toLocaleString()}</Text>
                            </View>
                            <View style={styles.addToCartContainer}>
                                <Button
                                    text={"Add to cart"}
                                    onPress={() => addToCart(item.id)}
                                    disabled={loading}
                                />
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#F8F8F8",
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
        fontFamily: "Spartan_700Bold"
    },
    header: {
        backgroundColor: '#F8C471',
        padding: 10,
        paddingTop: 40,
    },
    headerTitle: {
        fontFamily: "Spartan_700Bold",
        fontSize: 28,
        color: "#f8f8f8",
    },
    searchInput: {
        height: 25,
        fontSize: 12,
        width: 100,
    },
    storeInfoContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        backgroundColor: colors.Font_2,
    },
    headerSection: {
        flexDirection: "row",
        marginBottom: 12,
    },
    storeAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    mainInfo: {
        flex: 1,
        justifyContent: "center",
    },
    storeName: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
        color: colors.Font,
    },
    statsRow: {
        flexDirection: "column",
        marginBottom: 8,
    },
    statsText: {
        color: colors.Font,
        marginHorizontal: 0,
        fontSize: 14,
    },
    addressButton: {
        marginTop: 4,
    },
    addressText: {
        color: colors.Orange_Base,
        fontSize: 14,
    },
    followButtonContainer: {
        alignItems: "flex-end",
        flex: 1
    },
    flatListContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    dishItem: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: colors.Font_2,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dishImageContainer: {
        marginRight: 12,
    },
    dishImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    dishInfo: {
        flex: 1,
        justifyContent: "space-between",
        marginRight: 8,
    },
    dishName: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.Font,
        marginBottom: 4,
    },
    dishDescription: {
        fontSize: 14,
        color: colors.Font,
        opacity: 0.8,
        marginBottom: 4,
    },
    dishPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.Orange_Base,
    },
    addToCartContainer: {
        justifyContent: "center",
    },
    separator: {
        height: 1,
        backgroundColor: colors.Font_2,
    },
});

export default StorePage;