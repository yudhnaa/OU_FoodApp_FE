import { View, Text, Pressable, StyleSheet, FlatList,ActivityIndicator,RefreshControl } from "react-native";
import { Image } from "expo-image";
import { styles } from "@/components/home/Styles";
import APIs, { endpoints } from "@/configs/APIs";
import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { useEffect, useState,useCallback } from "react";
import { Icon } from "react-native-paper";
import { router } from "expo-router";
import { useFoodContext } from "@/app/(store)/manage/FoodDetailsContext";
// import {useAuth} from "@/components/AuthContext";
import {useFocusEffect} from "expo-router";


export default function ManageStore() {

    const [data, setData] = useState<any[]>([]);
    const {selectedFood,setSelectedFood} = useFoodContext();
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    // const {access_token} = useAuth();

    const loadData = async () => {
        if(page > 0){
            setLoading(true);

            try {
                let url = `${endpoints['store_dishes']}?page=${page}`
                const response = await APIs.get(url);

                // const response = await authApi(access_token).get(endpoints['store_dishes']);

                if(page > 1){
                    setData(current => [...current,...response.data.results]);
                }
                else{
                    setData(response.data.results);
                }

                if(response.data.next === null){
                    setPage(0);
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
                setLoading(false);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        },[page])
    );

    const loadMore = () => {
        if(page > 0 && !loading){
            setPage(page + 1);
        }
    }

    const refresh = () => {
        setPage(1);
        loadData();
    }

    const deleteDish = async (id: number) => {
        try {
            // console.log('Attempting to delete dish with id:', id);

            // Log the full endpoint URL
            // console.log('Delete endpoint:', endpoints['store_dishes_delete'](id));

            const res = await APIs.delete(endpoints['store_dishes_delete'](id));

            if (res.status === 200) {
                // Use setState to update data properly
                setData(prevData => prevData.filter(item => item.id !== id));
                alert('Delete dish successfully');
            } else {
                alert('Failed to delete dish');
            }
        } catch (error) {
            // More detailed error logging
            console.log('Delete error:', error);
        }
    };


    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <Pressable style={styles1.addDishButton} onPress={() => router.push("/manage/createDish")}>
                    <View className="flex-row justify-between items-center">
                        <Text style={styles1.AddDishText}>Add new dish</Text>
                        <Icon
                            source="plus-circle-outline"
                            color={colors.Font_2}
                            size={28}
                        />
                    </View>
                </Pressable>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles1.orderContainer} >
                                <Image source={item.image} style={styles1.image} />
                                <View className="ml-5 flex-1 flex-row justify-between items-center">
                                    <View>
                                        <Text style={styles1.orderTitle}>{item.name}</Text>
                                        <Text style={styles1.orderPrice}>Price : ${item.price}</Text>

                                        <View className={'flex-row flex-1 w-[100%]'}>
                                            <Pressable style={[styles1.editButton]} onPress={() => {
                                                setSelectedFood(item);
                                                router.push(`/manage/${item.id.toString()}`);
                                            }}>
                                                <Text style={styles1.AddDishText}>Edit</Text>
                                                <View className={'pl-2'}>
                                                    <Icon
                                                        source="pencil-outline"
                                                        color={colors.Font_2}
                                                        size={20}
                                                    />
                                                </View>
                                            </Pressable>

                                            <Pressable style={[styles1.editButton]} onPress={() => {
                                                deleteDish(item.id);
                                            }}>
                                                <Text style={styles1.AddDishText}>Delete</Text>
                                                <View className={'pl-2'}>
                                                    <Icon
                                                        source="trash-can-outline"
                                                        color={colors.Font_2}
                                                        size={20}
                                                    />
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                        </View>
                    )}
                    onEndReached={loadMore}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator size="large" color={colors.Orange_Base} />
                        ) : null
                    } // Hiển thị loading indicator khi đang tải
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                />
            </View>
        </View>
    )
}

const styles1 = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        width: "30%",
        borderRadius: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.Orange_Base,
    },
    inactiveTab: {
        backgroundColor: colors.Orange_2,
    },
    tabTextActive: {
        ...fontsStyles.TextInputField,
        color: colors.Font_2,

    },
    tabTextInactive: {
        ...fontsStyles.TextInputField,
        color: colors.Orange_Base,
    },

    orderContainer: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        // marginBottom: 10,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderPrice: {
        fontSize: 16,
        color: colors.Font,
        marginBottom: 5,
    },
    orderDetails: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    trackButton: {
        backgroundColor: colors.Orange_2,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyImage: {
        width: 150,
        height: 170,
        alignSelf: "center",
        marginVertical: "20%",
    },
    emptyText: {
        color: colors.Orange_Base,
        ...fontsStyles.subtitulo,
        fontSize: 30,
        textAlign: "center",
        width: "80%",
    },
    addDishButton : {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginLeft: 15,
        marginRight: 15,
        width : '40%',
    },
    AddDishText : {
        fontFamily : "Spartan_700Bold",
        color : colors.Font_2,
        padding : 2,
    },
    editButton : {
        backgroundColor: colors.Orange_Base,
        borderRadius: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        // flex : 1,
        flexDirection : 'row',
        marginRight : 10,
        // justifyContent : 'space-between',
    },
});
