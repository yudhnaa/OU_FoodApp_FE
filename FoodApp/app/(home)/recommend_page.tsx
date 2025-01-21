import { Text,View } from "react-native";
import { styles } from "@/components/home/Styles";
import FoodFlatList from "@/components/home/foodFlatList";

const data = [
    {
        id: 1,
        name: "Favorite Dish 1",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Favorite Dish 1",
        category: "Snacks",
    },
    {
        id: 2,
        name: "Favorite Dish 2",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the Favorite Dish 2",
        category: "Meal"
    },
    {
        id: 3,
        name: "Favorite Dish 3",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        description: "This is the description of the Favorite Dish 3",
        category: "Vegan"
    },
    {
        id: 4,
        name: "Favorite Dish 4",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_4.png'),
        description: "This is the description of the Favorite Dish 4",
        category: "Desserts"
    },
    {
        id: 5,
        name: "Favorite Dish 5",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Favorite Dish 5",
        category: "Drinks"
    },
    {
        id: 6,
        name: "Favorite Dish 6",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the Favorite Dish 6",
        category: "Snacks"
    },
    {
        id: 7,
        name: "Favorite Dish 7",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        description: "This is the description of the Favorite Dish 7",
        category: "Meal"
    },
    {
        id: 8,
        name: "Favorite Dish 8",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_4.png'),
        description: "This is the description of the Favorite Dish 8",
        category: "Vegan"
    },
    {
        id: 9,
        name: "Favorite Dish 9",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Favorite Dish 9",
        category: "Desserts"
    },
    {
        id: 10,
        name: "Favorite Dish 10",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        description: "This is the description of the Favorite Dish 10",
        category: "Drinks"
    },
    {
        id: 11,
        name: "Favorite Dish 11",
        price: 10.0,
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        description: "This is the description of the Favorite Dish 11",
        category: "Snacks"
    },
]

export default function RecommendPage() {
    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>Discover the dishes recommended by the chef.</Text>
                </View>
                <FoodFlatList data={data} />
            </View>
        </View>
    )
}