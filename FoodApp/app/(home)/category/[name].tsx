import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, FlatList, RefreshControl, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { styles } from "@/components/home/Styles";
import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { Icon } from "react-native-paper";
import { router } from "expo-router";
import { useFoodContext } from "./FoodContext";
import { useState,useEffect } from "react";
import APIs,{ endpoints } from "@/configs/APIs";

export default function CategoryPage() {
    const { name } = useLocalSearchParams();
    const { setSelectedFood } = useFoodContext();
    const [list_dish, setList_dish] = useState<any[]>([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    const load_dish = async () => {
        if(page > 0){
            setLoading(true);

            try{
                let url = `${endpoints['list_dish'](name)}?page=${page}`
                let res = await APIs.get(url)
                const mappedData = res.data.results.map((item: any) => ({
                    id : item.id,
                    name : item.name,
                    price: `$${item.price.toFixed(2)}`,
                    image : { uri : item.image },
                    description : item.description,
                    category : item.food_type,
                    categoryID : item.food_type_id,
                    storeId: item.store_id
                }));

                if(page > 1){
                    setList_dish(current => [...current,...mappedData]);
                }
                else{
                    setList_dish(mappedData);
                }

                if(res.data.next === null){
                    setPage(0);
                }
                // console.log(typeof res.data[0]['id']);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
    }


    useEffect(() => {
        load_dish();
    },[name,page])

    const loadMore = () => {
        if(page > 0 && !loading){
            setPage(page + 1);
        }
    }

    const refresh = () => {
        setPage(1);
        load_dish();
    }

    const renderMenuItem = ({ item }: { item: any }) => (
        <Pressable
            style={styles.menuItem}
            onPress={() => {
                setSelectedFood(item);
                router.push(`/category/${name}/${item.id}`);
            }}>
            <Image source={item.image} style={styles.menuImage} />
            <View style={styles.menuContent}>
                <View style={[styles.menuHeader]}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{5}</Text>
                        <Icon source="star" size={16} color="#F3E9B5" />
                    </View>
                    <Text style={styles.menuPrice}>{item.price}</Text>
                </View>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <View style={styles.seperateLine}></View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.backGround}>
            <View style={[styles.bodyPage,{paddingBottom : 30}]}>
                <View style={styles.header}>
                    <View style={styles.sortContainer}>
                        <Text>Sort By</Text>
                        <Pressable style={styles.sortButton}>
                            <Text style={styles.sortButtonText}>Popular</Text>
                            <Icon source="chevron-down" size={20} color="#E95322" />
                        </Pressable>
                    </View>
                </View>
                {/* {loading && <ActivityIndicator />} */}
                <FlatList
                    data={list_dish}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.menuList}
                    onEndReached={loadMore}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator size="large" color={colors.Orange_Base} />
                        ) : null
                    } // Hiển thị loading indicator khi đang tải
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh}/>}
                />
            </View>
        </View>
    );
}