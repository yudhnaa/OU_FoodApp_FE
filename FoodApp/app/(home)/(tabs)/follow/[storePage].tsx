import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles as bgStyles} from "@/components/home/Styles";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {router, Stack, useFocusEffect, useLocalSearchParams} from "expo-router";
import {Image} from "expo-image";
import Button from "@/components/home/button";
import BackButton from "@/components/home/backButton";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import Toast from "react-native-toast-message";


type StoreInfo = {
    id: number;
    date_joined: string;
    is_active: boolean;
    store_name: string,
    avatar: string,
    follower: number,
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
    const {access_token, userInfo} = useAuth()
    const [loading, setLoading] = useState(false);
    const {storePage, followId, isFollowed} = useLocalSearchParams()
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
    })

    const [dish, setDish] = useState<Dish[]>([]);

    const fetchStoreInfo = async () => {
        setLoading(true);
        try {
            await authApi(access_token).get(`${endpoints.get_store}${storePage}/`).then((res) => {
                console.log(res.data);
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
                headerStyle: {backgroundColor: '#F5CB58'},
                title: "Store",
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitle,
                headerShadowVisible: false,
                headerLeft: () => (<BackButton/>)
            }}></Stack.Screen>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View style={bgStyles.bodyPage}>
                <View style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "#ccc",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Image source={require("@/assets/images/avt.png")}
                           style={{width: 50, height: 50, marginRight: 20}}></Image>
                    {/*<Image source={remote source)} style={{width: 30, height: 30}}></Image>*/}
                    <View className={"flex-1"}>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{storeInfo?.store_name}</Text>
                        <Text>Date joined: {new Date(storeInfo?.date_joined).toLocaleDateString()}</Text>
                        <Text>Followers: {storeInfo?.follower}</Text>
                    </View>
                    {isFollowing ? (
                        <Button text={"UnFollow"} onPress={() => unFollow(Number.parseInt(followingId.toString()))}
                                disabled={loading}
                                buttonColor={colors.Orange_2} textColor={colors.Font}></Button>
                    ) : (
                        <Button text={"Follow"} onPress={follow} disabled={loading}></Button>
                    )}

                </View>
                <View>
                    <Text style={[fontStyles.Title, {margin: 10}]}>Danh sách các món ăn</Text>
                </View>
                <FlatList
                    data={dish}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: "#ccc",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Image source={{uri: item.image}}
                                   style={{width: 60, height: 60, marginRight: 20, borderRadius: 15}}></Image>
                            {/*<Image source={remote source)} style={{width: 30, height: 30}}></Image>*/}
                            <View>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>{item.name}</Text>
                                <Text>Mô tả: {item.description}</Text>
                                <Text>Ngày theo dõi: {item.price}</Text>
                            </View>
                            <Button text={"Add to card"} onPress={() => (followId)} disabled={loading}></Button>
                        </View>
                    )}
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
        backgroundColor: '#F8C471', // Màu nền của header
        padding: 10,
        paddingTop: 40, // Để tạo khoảng cách cho status bar
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
})

export default StorePage;