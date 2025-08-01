// import { Text,View } from "react-native";
// import { styles } from "@/components/home/Styles";
// import FoodFlatList from "@/components/home/foodFlatList";
// import { ActivityIndicator } from "react-native-paper";
// import { useEffect,useState } from "react";
// import APIs,{endpoints} from "@/configs/APIs";

// // const data = [
// //     {
// //         id: 1,
// //         name: "Best Seller Dish 1",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
// //         description: "This is the description of the Best Seller Dish 1",
// //         category: "Snacks",
// //     },
// //     {
// //         id: 2,
// //         name: "Best Seller Dish 2",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
// //         description: "This is the description of the Best Seller Dish 2",
// //         category: "Meal"
// //     },
// //     {
// //         id: 3,
// //         name: "Best Seller Dish 3",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
// //         description: "This is the description of the Best Seller Dish 3",
// //         category: "Vegan"
// //     },
// //     {
// //         id: 4,
// //         name: "Best Seller Dish 4",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_4.png'),
// //         description: "This is the description of the Best Seller Dish 4",
// //         category: "Desserts"
// //     },
// //     {
// //         id: 5,
// //         name: "Best Seller Dish 5",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
// //         description: "This is the description of the Best Seller Dish 5",
// //         category: "Drinks"
// //     },
// //     {
// //         id: 6,
// //         name: "Best Seller Dish 6",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
// //         description: "This is the description of the Best Seller Dish 6",
// //         category: "Snacks"
// //     },
// //     {
// //         id: 7,
// //         name: "Best Seller Dish 7",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
// //         description: "This is the description of the Best Seller Dish 7",
// //         category: "Meal"
// //     },
// //     {
// //         id: 8,
// //         name: "Best Seller Dish 8",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_4.png'),
// //         description: "This is the description of the Best Seller Dish 8",
// //         category: "Vegan"
// //     },
// //     {
// //         id: 9,
// //         name: "Best Seller Dish 9",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
// //         description: "This is the description of the Best Seller Dish 9",
// //         category: "Desserts"
// //     },
// //     {
// //         id: 10,
// //         name: "Best Seller Dish 10",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
// //         description: "This is the description of the Best Seller Dish 10",
// //         category: "Drinks"
// //     },
// //     {
// //         id: 11,
// //         name: "Best Seller Dish 11",
// //         price: 10.0,
// //         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
// //         description: "This is the description of the Best Seller Dish 11",
// //         category: "Snacks"
// //     },
// // ]

// export default function BestSeller() {
//     const [data,setData] = useState([]);

//     useEffect(() => {
//             const fetchData = async () => {
//                 try{
//                     // const dishType = await APIs.get(endpoints['dish_type']);

//                     let url = `${endpoints['dish']}?page=${1}`;

//                     const dish = await APIs.get(url);
    
//                     // const categories = dishType.data.map((item: any) => ({
//                     //    id : item.id,
//                     //    name : item.name,
//                     //    icon : { uri : item.image } 
//                     // }));
    
//                     const food = dish.data.results.map((item: any) => ({
//                         id : item.id,
//                         name : item.name,
//                         price: `$${item.price}`,
//                         image : { uri : item.image },
//                         description : item.description,
//                         category : item.food_type,
//                         categoryID : item.food_type_id,
//                     }));
    
//                     // const formattedData = [
//                     //     {
//                     //         type: 'categories',
//                     //         items: categories
//                     //     },
//                     //     {
//                     //         type: 'bestSeller',
//                     //         title: 'Best Seller',
//                     //         items: food
//                     //     },
//                     //     {
//                     //         type: 'promotion',
//                     //         text: 'Experience our delicious new dish',
//                     //         discount: '30% OFF',
//                     //     },
//                     //     {
//                     //         type: 'recommend',
//                     //         title: 'Recommend',
//                     //         items: food
//                     //     }
//                     // ];
    
//                     // setNewData(formattedData);
//                     setData(food);
//                 }
//                 catch(error){
//                     console.log(error);
//                 }
//             };
//             fetchData();
//         },[]);

//     return (
//         <View style={styles.backGround}>
//             <View style={styles.bodyPage}>
//                 <View style={styles.txtContainer}>
//                     <Text style={styles.txt}>Discover our most popular dishes!</Text>
//                 </View>
//                 <FoodFlatList data={data} />
//             </View>
//         </View>
//     );
// }



import { Text, View } from "react-native";
import { styles } from "@/components/home/Styles";
import FoodFlatList from "@/components/home/foodFlatList";
import { ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";
import APIs, { endpoints } from "@/configs/APIs";

export default function BestSeller() {
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

    const handleRefresh = async () => {
        await fetchData(1); // Gọi lại dữ liệu khi refresh
    };

    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>Discover our most popular dishes!</Text>
                </View>
                <FoodFlatList
                    data={data}
                    loading={loading}
                    hasMore={hasMore}
                    loadMore={handleLoadMore}
                    onRefresh={handleRefresh}
                />
            </View>
        </View>
    );
}