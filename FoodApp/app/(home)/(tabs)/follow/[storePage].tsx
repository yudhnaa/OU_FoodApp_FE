import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
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


type StoreInfo = {
    id: number;
    created_at: string;
    is_active: boolean;
    store_name: string,
    avatar: string,
    followers: number,
};

type Dish = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

function StorePage() {
    const {access_token} = useAuth()
    const [loading, setLoading] = useState(false);
    const {storePage} = useLocalSearchParams()
    const [storeInfo, setStoreInfo] = useState<StoreInfo>({
        id: 1,
        created_at: "2021-09-01",
        is_active: true,
        store_name: "Store 1",
        avatar: "https://i.pinimg.com",
        followers: 100,
    })
    const [dish, setDish] = useState<Dish[]>([
        {
            id: 1,
            name: "Dish 1",
            price: 10000,
            description: "Description",
            image: "https://i.pinimg.com",
        },
        {
            id: 2,
            name: "Dish 2",
            price: 20000,
            description: "Description",
            image: "https://i.pinimg.com",
        },
        {
            id: 3,
            name: "Dish 3",
            price: 30000,
            description: "Description",
            image: "https://i.pinimg.com",
        },
        {
            id: 4,
            name: "Dish 4",
            price: 40000,
            description: "Description",
            image: "https://i.pinimg.com",
        },
        {
            id: 5,
            name: "Dish 5",
            price: 50000,
            description: "Description",
            image: "https://i.pinimg.com",
        }
    ])

    const fetchStoreInfo = async () => {
        setLoading(true);
        try {
            // await authApi(access_token).get(endpoints.store + storePage).then((res) => {
            //     console.log(res.data);
            // })
            // setStoreInfo()
        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }

    const unFollow = async (id: number) => {
        console.log(id);
    }

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
                    justifyContent: "space-between"
                }}>
                    <Image source={require("@/assets/images/avt.png")}
                           style={{width: 50, height: 50, marginRight: 20}}></Image>
                    {/*<Image source={remote source)} style={{width: 30, height: 30}}></Image>*/}
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{storeInfo?.store_name}</Text>
                        <Text>Created date:: {storeInfo?.created_at}</Text>
                        <Text>Followers: {storeInfo?.followers}</Text>
                    </View>
                    <Button text={"UnFollow"} onPress={() => unFollow(storeInfo?.id || 1)} disabled={loading} buttonColor={colors.Orange_2} textColor={colors.Font}></Button>
                </View>
                <View>
                    <Text style={[fontStyles.Title, {margin: 10}]}>Danh sách các món ăn</Text>
                </View>
                <FlatList
                    data={dish}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={{padding: 10, borderBottomWidth: 1, borderColor: "#ccc", flexDirection: "row", justifyContent: "space-between"}}>
                            <Image source={require("@/assets/images/bestSeller_pic/pic_1.png")}
                                   style={{width: 60, height: 60, marginRight: 20, borderRadius: 15}}></Image>
                            {/*<Image source={remote source)} style={{width: 30, height: 30}}></Image>*/}
                            <View>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>{item.name}</Text>
                                <Text>Mô tả: {item.description}</Text>
                                <Text>Ngày theo dõi: {item.price}</Text>
                            </View>
                            <Button text={"Add to card"} onPress={() => unFollow(item.id)} disabled={loading}></Button>
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