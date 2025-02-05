import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Platform } from "react-native";
import colors from "@/styles/colors";
import { Icon } from "react-native-paper";
import { useFoodContext } from "../FoodContext";
import LoadingComponent from "@/components/home/LoadingComponents";
import { useCallback, useEffect, useState } from "react";
import APIs, { authApi, endpoints } from "@/configs/APIs";
import Toast, { BaseToast } from "react-native-toast-message";
import { useAuth } from "@/components/AuthContext";
import { router, useFocusEffect } from "expo-router";
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');


type StoreInfo = {
    id: number;
    date_joined: string;
    is_active: boolean;
    store_name: string,
    avatar: string,
    follower: number,
    address: string,
};

export default function FoodDetailPage() {
    const { selectedFood } = useFoodContext();
    const [quantity, setQuantity] = useState(1);
    const [toppings, setToppings] = useState<any[]>([]);
    const [pressedMinus, setPressedMinus] = useState(false);
    const [pressedPlus, setPressedPlus] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followId, setFollowId] = useState(0);
    const { access_token, userInfo } = useAuth()
    const [storeInfo, setStoreInfo] = useState<StoreInfo>({
        id: 0,
        date_joined: "",
        is_active: false,
        store_name: "",
        avatar: "",
        follower: 0,
        address: "",
    });


    const check_follow = async () => {
        await authApi(access_token).post(endpoints.is_following, {
            store: selectedFood.storeId,
            guest: userInfo.id
        }).then((res) => {
            setIsFollowing(res.data.is_following);
            setFollowId(res.data.follow_id);
        })
    }
    useFocusEffect(
        useCallback(() => {
            check_follow().finally(() => {
                // console.log("Checked")
            })
        }, [])
    )

    const fetchStoreInfo = async () => {
        try {
            await authApi(access_token).get(`${endpoints.get_store}${selectedFood.storeId}/`).then((res) => {
                setStoreInfo(res.data);
            }).catch((ex: any) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: ex.response?.data?.error_description || `Loading failed`,
                });
            });
        } catch (ex: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load store information',
            });
        }
    };

    useEffect(() => {
        if (selectedFood?.storeId) {
            fetchStoreInfo();
        }
    }, [selectedFood]);

    const loadTopping = async () => {
        try {
            let res = await APIs.get(endpoints["dish_topping"](selectedFood.id));
            const toppingsWithCheckbox = res.data.map((topping: any) => ({
                ...topping,
                quantity: 0,
                selected: false,
            }));
            setToppings(toppingsWithCheckbox);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTopping();
    }, [selectedFood.id]);

    const handleQuantityChange = (type: any) => {
        if (type === "increase") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleToppingSelection = (toppingId: any) => {
        const updatedToppings = toppings.map((topping) =>
            topping.id === toppingId
                ? {
                    ...topping,
                    selected: !topping.selected,
                    quantity: !topping.selected ? 1 : 0, // Nếu chọn, đặt số lượng là 1; nếu bỏ chọn, reset về 0
                }
                : topping
        );
        setToppings(updatedToppings);
    };

    const handleToppingQuantityChange = (toppingId: any, type: any) => {
        const updatedToppings = toppings.map((topping) =>
            topping.id === toppingId && topping.selected
                ? {
                    ...topping,
                    quantity: type === "increase" ? topping.quantity + 1 : Math.max(0, topping.quantity - 1),
                }
                : topping
        );
        setToppings(updatedToppings);
    };

    const toastConfig = {
        success: (props: any) => (
            <BaseToast
                {...props}
                style={styles.successToast}
                text1Style={styles.toastText1}
                text2Style={styles.toastText2}
            />
        ),
        error: (props: any) => (
            <BaseToast
                {...props}
                style={styles.errorToast}
                text1Style={styles.toastText1}
                text2Style={styles.toastText2}
            />
        ),
    };

    const addToCart = async () => {
        try {
            const selectedToppings = toppings
                .filter((topping) => topping.selected)
                .map((topping) => ({
                    topping_id: topping.id,
                    quantity: topping.quantity,
                }));

            const payload = {
                dish_id: selectedFood.id,
                quantity,
                toppings: selectedToppings,
            };

            console.log(payload)


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

    const follow = async () => {
        // console.log({
        //     store: selectedFood.storeId,
        //     guest: userInfo.id
        // })
        try {
            await authApi(access_token).post(endpoints.follow_store, {
                store: selectedFood.storeId,
                guest: userInfo.id
            }).then((res) => {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Followed successfully 👌',
                })
                setFollowId(res.data.id);
                setIsFollowing(true);
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

    const unfollow = async () => {
        // console.log(selectedFood.storeId);
        await authApi(access_token).delete(endpoints.unfollow_store + followId + "/").then((res) => {
            alert("Unfollowed successfully");
            setIsFollowing(false);
            setFollowId(0);
        }).catch((ex: any) => {
            alert(ex.response?.data?.error_description || `Unfollow failed\nStatus code: ${ex.status}`);
        }).finally(() => {
        })
    }

    if (!selectedFood) {
        return <LoadingComponent />;
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Icon source="arrow-left" size={24} color={colors.Font_2} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{selectedFood.name}</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={selectedFood.image} style={styles.image} />
                    <BlurView intensity={80} style={styles.priceTag}>
                        <Text style={styles.price}>{selectedFood.price}</Text>
                    </BlurView>
                </View>

                <View style={styles.content}>
                    <View style={styles.titleSection}>
                        <Text style={styles.foodTitle}>{selectedFood.name}</Text>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={[styles.quantityButton, pressedMinus && styles.quantityButtonPressed]}
                                onPress={() => handleQuantityChange("decrease")}
                                onPressIn={() => setPressedMinus(true)}
                                onPressOut={() => setPressedMinus(false)}
                            >
                                <Icon source="minus" size={20} color={colors.Orange_Base} />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity
                                style={[styles.quantityButton, pressedPlus && styles.quantityButtonPressed]}
                                onPress={() => handleQuantityChange("increase")}
                                onPressIn={() => setPressedPlus(true)}
                                onPressOut={() => setPressedPlus(false)}
                            >
                                <Icon source="plus" size={20} color={colors.Orange_Base} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.descriptionCard}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{selectedFood.description}</Text>
                    </View>

                    <View style={styles.storeCard}>
                        <TouchableOpacity
                            style={styles.storeHeader}
                            onPress={() => {
                                router.push({
                                    pathname: "/follow/[storePage]",
                                    params: {
                                        storePage: selectedFood.storeId,
                                        isFollowed: isFollowing.toString(),
                                        followId: followId
                                    }
                                })
                            }}
                        >
                            <View style={styles.storeInfo}>
                                <Icon source="store" size={24} color={colors.Orange_Base} />
                                <View style={styles.storeTextInfo}>
                                    <Text style={styles.storeName}>{storeInfo.store_name}</Text>
                                    <Text style={styles.storeAddress}>{storeInfo.address}</Text>
                                    <Text style={styles.followers}>{storeInfo.follower} followers</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.storeActions}>
                            {isFollowing ? (
                                <TouchableOpacity style={styles.unfollowButton} onPress={unfollow}>
                                    <Icon source="heart" size={20} color={colors.Font_2} />
                                    <Text style={styles.followButtonTxt}>Unfollow</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.followButton} onPress={follow}>
                                    <Icon source="heart-outline" size={20} color={colors.Font_2} />
                                    <Text style={styles.followButtonTxt}>Follow</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.chatButton}>
                                <Icon size={24} source="chat-outline" color={colors.Font_2} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.toppingsSection}>
                        <Text style={styles.sectionTitle}>Toppings</Text>
                        {toppings.map((topping) => (
                            <View key={topping.id.toString()} style={styles.toppingItem}>
                                <TouchableOpacity
                                    style={styles.toppingCheckbox}
                                    onPress={() => handleToppingSelection(topping.id)}
                                >
                                    <Icon
                                        source={topping.selected ? "checkbox-marked-circle" : "checkbox-marked-circle-outline"}
                                        size={24}
                                        color={topping.selected ? colors.Orange_Base : "#ccc"}
                                    />
                                    <Text style={styles.toppingName}>{topping.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.toppingPriceSection}>
                                    <Text style={styles.toppingPrice}>${topping.price.toFixed(2)}</Text>
                                    {topping.selected && (
                                        <View style={styles.toppingControls}>
                                            <TouchableOpacity
                                                style={styles.toppingQuantityButton}
                                                onPress={() => handleToppingQuantityChange(topping.id, "decrease")}
                                            >
                                                <Icon source="minus" size={16} color={colors.Orange_Base} />
                                            </TouchableOpacity>
                                            <Text style={styles.toppingQuantity}>{topping.quantity}</Text>
                                            <TouchableOpacity
                                                style={styles.toppingQuantityButton}
                                                onPress={() => handleToppingQuantityChange(topping.id, "increase")}
                                            >
                                                <Icon source="plus" size={16} color={colors.Orange_Base} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <Toast config={toastConfig} position="top" />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addButton} onPress={addToCart}>
                    <Icon source="cart-plus" size={24} color={colors.Font_2} />
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.Font_2,
    },
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 16 : 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 20,
        color: colors.Font_2,
        fontFamily: 'Spartan_700Bold',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    imageContainer: {
        width: width,
        height: 400,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    priceTag: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        overflow: 'hidden',
    },
    content: {
        padding: 20,
        gap: 20,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    foodTitle: {
        fontSize: 24,
        fontFamily: 'Spartan_700Bold',
        color: '#333',
        flex: 1,
    },
    price: {
        fontSize: 24,
        color: colors.Font_2,
        fontFamily: 'Spartan_700Bold',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.Orange_2,
        borderRadius: 25,
        padding: 5,
    },
    quantityButton: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: colors.Font_2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    quantityButtonPressed: {
        backgroundColor: colors.Orange_Base,
        transform: [{ scale: 0.95 }],
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 15,
        fontFamily: 'Spartan_700Bold',
    },
    descriptionCard: {
        backgroundColor: colors.Font_2,
        borderRadius: 15,
        padding: 15,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Spartan_700Bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        fontFamily: 'Spartan_400Regular',
    },
    storeCard: {
        backgroundColor: colors.Orange_2,
        borderRadius: 15,
        padding: 15,
        elevation: 3,
    },
    storeHeader: {
        marginBottom: 15,
    },
    storeInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    storeTextInfo: {
        marginLeft: 10,
        flex: 1,
    },
    storeName: {
        fontSize: 18,
        fontFamily: 'Spartan_700Bold',
        color: colors.Orange_Base,
    },
    storeAddress: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Spartan_400Regular',
        marginTop: 4,
    },
    followers: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Spartan_400Regular',
        marginTop: 4,
    },
    storeActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
    },
    followButton: {
        backgroundColor: colors.Orange_Base,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 25,
        gap: 8,
        elevation: 2,
    },
    unfollowButton: {
        backgroundColor: colors.Yellow_Base,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 25,
        gap: 8,
        elevation: 2,
    },
    followButtonTxt: {
        fontFamily: 'Spartan_500Medium',
        fontSize: 16,
        color: colors.Font_2,
    },
    chatButton: {
        backgroundColor: colors.Orange_Base,
        padding: 8,
        borderRadius: 25,
        elevation: 2,
    },
    toppingsSection: {
        backgroundColor: colors.Font_2,
        borderRadius: 15,
        padding: 15,
        elevation: 3,
    },
    toppingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    toppingCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 10,
    },
    toppingName: {
        fontSize: 16,
        fontFamily: 'Spartan_400Regular',
        color: '#333',
    },
    toppingPriceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    toppingPrice: {
        fontSize: 16,
        color: colors.Orange_Base,
        fontFamily: 'Spartan_500Medium',
    },
    toppingControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.Orange_2,
        borderRadius: 15,
        padding: 3,
    },
    toppingQuantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.Font_2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toppingQuantity: {
        fontSize: 16,
        marginHorizontal: 10,
        fontFamily: 'Spartan_500Medium',
    },
    footer: {
        padding: 16,
        backgroundColor: colors.Font_2,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    addButton: {
        backgroundColor: colors.Orange_Base,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 30,
        gap: 10,
        elevation: 3,
    },
    addButtonText: {
        color: colors.Font_2,
        fontSize: 18,
        fontFamily: 'Spartan_700Bold',
    },
    successToast: {
        borderLeftColor: "green",
        backgroundColor: "#e0ffe0",
    },
    errorToast: {
        borderLeftColor: "red",
        backgroundColor: "#ffe0e0",
    },
    toastText1: {
        fontSize: 16, // Chữ lớn hơn cho tiêu đề
        color: "#333",
        fontFamily: 'Spartan_700Bold',
    },
    toastText2: {
        fontSize: 16, // Chữ lớn hơn cho nội dung
        color: "#666",
        fontFamily: 'Spartan_700Bold',
    },
});
