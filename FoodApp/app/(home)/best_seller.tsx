import { Text,View } from "react-native";
import { styles } from "@/components/home/Styles";
import FoodFlatList from "@/components/home/foodFlatList";


const data = [
    {
        id: 1,
        name: "Best Seller Dish 1",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Best Seller Dish 1",
        category: "Snacks",
    },
    {
        id: 2,
        name: "Best Seller Dish 2",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the Best Seller Dish 2",
        category: "Meal"
    },
    {
        id: 3,
        name: "Best Seller Dish 3",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        description: "This is the description of the Best Seller Dish 3",
        category: "Vegan"
    },
    {
        id: 4,
        name: "Best Seller Dish 4",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_4.png'),
        description: "This is the description of the Best Seller Dish 4",
        category: "Desserts"
    },
    {
        id: 5,
        name: "Best Seller Dish 5",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Best Seller Dish 5",
        category: "Drinks"
    },
    {
        id: 6,
        name: "Best Seller Dish 6",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the Best Seller Dish 6",
        category: "Snacks"
    },
    {
        id: 7,
        name: "Best Seller Dish 7",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        description: "This is the description of the Best Seller Dish 7",
        category: "Meal"
    },
    {
        id: 8,
        name: "Best Seller Dish 8",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_4.png'),
        description: "This is the description of the Best Seller Dish 8",
        category: "Vegan"
    },
    {
        id: 9,
        name: "Best Seller Dish 9",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Best Seller Dish 9",
        category: "Desserts"
    },
    {
        id: 10,
        name: "Best Seller Dish 10",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Best Seller Dish 10",
        category: "Drinks"
    },
    {
        id: 11,
        name: "Best Seller Dish 11",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the Best Seller Dish 11",
        category: "Snacks"
    },
]

export default function BestSeller() {
    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>Discover our most popular dishes!</Text>
                </View>
                <FoodFlatList data={data} />
            </View>
        </View>
    );
}
