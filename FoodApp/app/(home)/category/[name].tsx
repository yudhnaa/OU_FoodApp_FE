import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, FlatList, Pressable, StyleSheet } from "react-native";
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

    const [list_dish, setList_dish] = useState([]);

    const load_dish = async () => {
        try{
            let res = await APIs.get(endpoints['list_dish'](name));
            const mappedData = res.data.map((item: any) => ({
                id : item.id,
                name : item.name,
                price: `$${item.price.toFixed(2)}`,
                image : { uri : item.image },
                description : item.description,
                category : item.food_type,
                categoryID : item.food_type_id,
            }));
            setList_dish(mappedData);
            // console.log(typeof res.data[0]['id']);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        load_dish();
    },[name])

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
                        <Text style={styles.ratingText}>{item.rating}</Text>
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
                <FlatList
                    data={list_dish}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.menuList}
                />
            </View>
        </View>
    );
}