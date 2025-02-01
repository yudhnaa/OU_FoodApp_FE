import { View, Text } from "react-native";
import { styles } from "@/components/home/Styles";
import FoodFlatList from "@/components/home/foodFlatList";
import { useState,useEffect } from "react";
import APIs,{endpoints} from "@/configs/APIs";


// const data = [
//     {
//         id: 1,
//         name: "Favorite Dish 1",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
//         description: "This is the description of the favorite dish 1",
//         category: "Snacks",
//     },
//     {
//         id: 2,
//         name: "Favorite Dish 2",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
//         description: "This is the description of the favorite dish 2",
//         category: "Meal"
//     },
//     {
//         id: 3,
//         name: "Favorite Dish 3",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         description: "This is the description of the favorite dish 3",
//         category: "Vegan"
//     },
//     {
//         id: 4,
//         name: "Favorite Dish 4",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_4.png'),
//         description: "This is the description of the favorite dish 4",
//         category: "Desserts"
//     },
//     {
//         id: 5,
//         name: "Favorite Dish 5",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
//         description: "This is the description of the favorite dish 5",
//         category: "Drinks"
//     },
//     {
//         id: 6,
//         name: "Favorite Dish 6",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
//         description: "This is the description of the favorite dish 6",
//         category: "Snacks"
//     },
//     {
//         id: 7,
//         name: "Favorite Dish 7",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         description: "This is the description of the favorite dish 7",
//         category: "Meal"
//     },
//     {
//         id: 8,
//         name: "Favorite Dish 8",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_4.png'),
//         description: "This is the description of the favorite dish 8",
//         category: "Vegan"
//     },
//     {
//         id: 9,
//         name: "Favorite Dish 9",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
//         description: "This is the description of the favorite dish 9",
//         category: "Desserts"
//     },
//     {
//         id: 10,
//         name: "Favorite Dish 10",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
//         description: "This is the description of the favorite dish 10",
//         category: "Drinks"
//     },
//     {
//         id: 11,
//         name: "Favorite Dish 11",
//         price: 10.0,
//         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
//         description: "This is the description of the favorite dish 11",
//         category: "Snacks"
//     },
// ]

export default function FavoritePage() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const fetchData = async (page = 1) => {
            if (loading || !hasMore) return;
    
            setLoading(true);
            try {
                const dish = await APIs.get(`${endpoints['dish']}?page=${page}`);
    
                if (!dish.data || !Array.isArray(dish.data.results)) {
                    console.error("Invalid food data format:", dish.data);
                    setHasMore(false);
                    return;
                }
    
                const food = dish.data.results.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    price: `$${item.price}`,
                    image: { uri: item.image },
                    description: item.description,
                    category: item.food_type,
                    categoryID: item.food_type_id,
                }));
    
                setData(prevData => (page === 1 ? food : [...prevData, ...food]));
                setHasMore(dish.data.next !== null);
                setCurrentPage(page);
            } catch (error) {
                console.error("Error fetching food data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchData(1); // Tải trang đầu tiên
        }, []);
    
        const handleLoadMore = () => {
            if (!loading && hasMore) {
                fetchData(currentPage + 1);
            }
        };

    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>It's time to buy your favorite dish.</Text>
                </View>
                <FoodFlatList
                    data={data}
                    loading={loading}
                    hasMore={hasMore}
                    loadMore={handleLoadMore}
                />
            </View>
        </View>
    );
}


