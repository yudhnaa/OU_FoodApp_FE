import { View, Text, Pressable, FlatList, Image } from "react-native";
import { router, Link } from "expo-router";
import { StyleSheet } from "react-native";
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";
import { useFoodContext } from "../category/FoodContext";

const categoryIcons = {
    Snacks: require('@/assets/images/logo/smallLogo/bot-small-Snacks.png'),
    Desserts: require('@/assets/images/logo/smallLogo/bot-small-Desserts.png'),
    Drinks: require('@/assets/images/logo/smallLogo/bot-small-Drinks.png'),
    Meal: require('@/assets/images/logo/smallLogo/bot-small-Meals.png'),
    Vegan: require('@/assets/images/logo/smallLogo/bot-small-Vegan.png'),
};

const data = [
    {
        id: 1,
        name: "Favorite Dish 1",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the favorite dish 1",
        category: "Snacks",
    },
    {
        id: 2,
        name: "Favorite Dish 2",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the favorite dish 2",
        category: "Meal"
    },
    {
        id: 3,
        name: "Favorite Dish 3",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        description: "This is the description of the favorite dish 3",
        category: "Vegan"
    },
    {
        id: 4,
        name: "Favorite Dish 4",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_4.png'),
        description: "This is the description of the favorite dish 4",
        category: "Desserts"
    },
    {
        id: 5,
        name: "Favorite Dish 5",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the favorite dish 5",
        category: "Drinks"
    },
    {
        id: 6,
        name: "Favorite Dish 6",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the favorite dish 6",
        category: "Snacks"
    },
    {
        id: 7,
        name: "Favorite Dish 7",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        description: "This is the description of the favorite dish 7",
        category: "Meal"
    },
    {
        id: 8,
        name: "Favorite Dish 8",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_4.png'),
        description: "This is the description of the favorite dish 8",
        category: "Vegan"
    },
    {
        id: 9,
        name: "Favorite Dish 9",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the favorite dish 9",
        category: "Desserts"
    },
    {
        id: 10,
        name: "Favorite Dish 10",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the favorite dish 10",
        category: "Drinks"
    },
    {
        id: 11,
        name: "Favorite Dish 11",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the favorite dish 11",
        category: "Snacks"
    },
]

export default function FavoritePage() {
    const { setSelectedFood } = useFoodContext();
    const renderItem = ({ item }: { item: any }) => {
        if (item.empty) {
            return <View style={[styles.productItem]} />; // Chỉ giữ spacing
        }
        return (
            <Pressable 
                style={styles.productItem}
                onPress={() => {
                    setSelectedFood(item);
                    router.push(`/category/${item.category}/${item.id}`);
                }}
            >
                <View style={styles1.imageContainer}>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={styles1.iconContainer}>
                        <Image 
                            source={categoryIcons[item.category as keyof typeof categoryIcons]} 
                            style={styles1.iconImage} 
                        />
                    </View>
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </Pressable>
        );
    }

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        
        if (numberOfElementsLastRow !== 0) {
            numberOfElementsLastRow = numColumns - numberOfElementsLastRow;
            data = [...data, ...Array(numberOfElementsLastRow).fill({ empty: true })];
        }
    
        return data;
    };

    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles1.txtContainer}>
                    <Text style={styles1.txt}>It's time to buy your favorite dish.</Text>
                </View>
                <FlatList
                    data={formatData(data, 2)}
                    numColumns={2}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                />
            </View>
        </View>
    );
}

const styles1 = StyleSheet.create({
    txt: {
        fontSize: 15,
        fontFamily: "Spartan_700Bold",
        color: colors.Orange_Base,
        textAlign: 'center',
    },
    txtContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
        padding: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconImage: {
        resizeMode: 'contain',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    }
});


