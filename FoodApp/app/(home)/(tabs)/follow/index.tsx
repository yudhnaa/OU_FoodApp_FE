import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from "react-native";
import {styles as bgStyles} from "@/components/home/Styles";
import {LoadingOverlay} from "@/components/home/LoadingComponents";
import {authApi, endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import {router, useFocusEffect} from "expo-router";
import {Image} from "expo-image";
import Button from "@/components/home/button";

type Follow = {
    id: number;
    created_at: string;
    is_active: boolean;
    guest: number,
    store: number,
    store_name: string,
    follow_date: string,
    avatar: string,
};

function Follow() {
    const {access_token} = useAuth()
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState<Follow[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFollow = async () => {
        setLoading(true);
        try {
            await authApi(access_token).get(endpoints.follow).then((res) => {
                setFollows(res.data);
            })
        } catch (ex: any) {
            alert(ex.response?.data?.error_description || `Loading failed\nStatus code: ${ex.status}`);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchFollow();
        setRefreshing(false);
    };

    const unFollow = async (id: number) => {
        console.log(id);
    }


    useFocusEffect(
        useCallback(() => {
            fetchFollow();
        }, [])
    )

    return (
        <View style={bgStyles.backGround}>
            {loading && (<LoadingOverlay></LoadingOverlay>)}
            <View style={bgStyles.bodyPage}>
                <FlatList
                    data={follows}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={(
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    )}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc", flexDirection: "row" }}>
                            <Image source={require("@/assets/images/avt.png")} style={{width: 50, height: 50, marginRight: 20}}></Image>
                            {/*<Image source={remote source)} style={{width: 30, height: 30}}></Image>*/}
                            <View onTouchEnd={() => {
                                router.push({
                                    pathname: "/follow/[storePage]",
                                    params: {storePage: item.store}
                                })
                            }}>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>{item.store_name}</Text>
                                <Text>Ngày tạo: {item.created_at}</Text>
                                <Text>Ngày theo dõi: {item.follow_date}</Text>
                            </View>
                            <Button text={"UnFollow"} onPress={() => unFollow(item.id)} disabled={loading}></Button>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

export default Follow;