// import {View, Text, FlatList, Image, Pressable, StyleSheet} from 'react-native';
// import {router, Link} from "expo-router";
// import colors from "@/styles/colors";
// import {styles} from "@/components/home/Styles";
// import {useRouter} from 'expo-router';
// import {Icon} from 'react-native-paper'
// import Carousel from 'react-native-reanimated-carousel';
// import {useSharedValue, useDerivedValue} from 'react-native-reanimated';
// import {useFoodContext} from "@/app/(home)/category/FoodContext";
// import FoodFlatList from '@/components/home/foodFlatList';
// import APIs, {endpoints} from '@/configs/APIs';
// import {useEffect, useState} from 'react';
//
// export default function HomePage() {
//     const router = useRouter();
//     const activeIndex = useSharedValue(0);
//     const {setSelectedFood} = useFoodContext();
//     const [new_Data, setNewData] = useState<any[]>([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const dishType = await APIs.get(endpoints['dish_type']);
//                 const dish = await APIs.get(endpoints['dish']);
//
//                 const categories = dishType.data.map((item: any) => ({
//                     id: item.id,
//                     name: item.name,
//                     icon: {uri: item.image}
//                 }));
//
//                 const food = dish.data.map((item: any) => ({
//                     id: item.id,
//                     name: item.name,
//                     price: `$${item.price}`,
//                     image: {uri: item.image},
//                     description: item.description,
//                     category: item.food_type,
//                     // categoryID : item.food_type_id,
//                 }));
//
//                 const formattedData = [
//                     {
//                         type: 'categories',
//                         items: categories
//                     },
//                     {
//                         type: 'bestSeller',
//                         title: 'Best Seller',
//                         items: food
//                     },
//                     {
//                         type: 'promotion',
//                         text: 'Experience our delicious new dish',
//                         discount: '30% OFF',
//                     },
//                     {
//                         type: 'recommend',
//                         title: 'Recommend',
//                         items: food
//                     }
//                 ];
//
//                 setNewData(formattedData);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, []);
//
//     // The error "Warning: Text strings must be rendered within a `<Text>` component" occurs when you try to render a plain string directly inside a component that does not support it, such as a `<View>` or `<Pressable>`. To fix this, ensure that all text strings are wrapped inside a `<Text>` component.
//     //
//     //     In your code, the issue might be occurring in the `renderItem` function where you are using `Pressable` and other components. Ensure that any text strings are wrapped in a `<Text>` component.
//     //
//     //     Here is a possible fix for the `renderItem` function:
//     //
//     //     ```typescriptreact
//     const renderItem = ({item}: any) => {
//         switch (item.type) {
//             case 'categories':
//                 return (
//                     <FlatList
//                         data={item.items}
//                         horizontal
//                         keyExtractor={(category) => category.id}
//                         renderItem={({item: category}) => (
//                             <View className='ml-4 flex-col justify-center items-center'>
//                                 <View className='h-20 rounded-full' style={{
//                                     backgroundColor: '#F3E9B5',
//                                     flex: 1,
//                                     justifyContent: 'center',
//                                     alignItems: 'center'
//                                 }}>
//                                     <Pressable
//                                         onPress={() => router.navigate(`/category/${category.id.toString()}`)}
//                                         style={styles.categoryItem}
//                                     >
//                                         <Image source={category.icon}
//                                                style={styles.categoryIcon}
//                                                resizeMode="contain"
//                                         />
//                                     </Pressable>
//                                 </View>
//                                 <Text style={styles.categoryText}>{category.name}</Text>
//                             </View>
//                         )}
//                         showsHorizontalScrollIndicator={false}
//                         style={styles.categories}
//                         nestedScrollEnabled={true}
//                     />
//                 );
//             case 'bestSeller':
//                 return (
//                     <View style={styles.section}>
//                         <View className='flex-row justify-between items-center ml-4 mr-4'>
//                             <Text style={styles.sectionTitle}>{item.title}</Text>
//                             <Pressable onPress={() => router.push('/best_seller')}
//                                        style={{flexDirection: 'row', alignItems: 'center'}}>
//                                 <Text style={{color: '#E95322', fontFamily: 'Spartan_600SemiBold'}}>View all</Text>
//                                 <Icon
//                                     source="chevron-right"
//                                     color={"#E95322"}
//                                     size={28}
//                                 />
//                             </Pressable>
//                         </View>
//                         <FlatList
//                             data={item.items}
//                             horizontal
//                             keyExtractor={(product) => product.id}
//                             renderItem={({item: product}) => (
//                                 <Pressable
//                                     style={styles.productItem}
//                                     onPress={() => {
//                                         setSelectedFood(product);
//                                         console.log(product);
//                                         router.push(`/category/${product.categoryID.toString()}/${product.id}`);
//                                     }}
//                                 >
//                                     <Image source={product.image} style={styles.productImage}/>
//                                     <Text style={styles.categoryText}>{product.name}</Text>
//                                     <Text style={styles.productPrice}>{product.price}</Text>
//                                 </Pressable>
//                             )}
//                             showsHorizontalScrollIndicator={false}
//                             nestedScrollEnabled={true}
//                         />
//                     </View>
//                 );
//             case 'promotion':
//                 return (
//                     <View style={styles.promotionContainer}>
//                         <Carousel
//                             loop
//                             width={350}
//                             height={160}
//                             autoPlay={true}
//                             data={[1, 2, 3, 4]}
//                             scrollAnimationDuration={500}
//                             onSnapToItem={(index) => {
//                                 activeIndex.value = index; // Update shared value
//                             }}
//                             renderItem={({index}) => (
//                                 <View style={styles.promotionSlide}>
//                                     <View style={styles.promotionContent}>
//                                         <View style={styles.promotionTextContainer}>
//                                             <Text style={styles.promotionText}>{item.text}</Text>
//                                             <Text style={styles.promotionDiscount}>{item.discount}</Text>
//                                         </View>
//                                         <Image
//                                             source={require('@/assets/images/bestSeller_pic/pic_1.png')}
//                                             style={styles.promotionImage}
//                                         />
//                                     </View>
//                                 </View>
//                             )}
//                         />
//                     </View>
//                 );
//             case 'recommend':
//                 return (
//                     <View style={styles.section}>
//                         <View className='flex-row justify-between items-center ml-4 mr-4'>
//                             <Text style={styles.sectionTitle}>{item.title}</Text>
//                             <Pressable onPress={() => router.push('/recommend_page')}
//                                        style={{flexDirection: 'row', alignItems: 'center'}}>
//                                 <Text style={{color: '#E95322', fontFamily: 'Spartan_600SemiBold'}}>View all</Text>
//                                 <Icon
//                                     source="chevron-right"
//                                     color={"#E95322"}
//                                     size={28}
//                                 />
//                             </Pressable>
//                         </View>
//
//                         <FoodFlatList data={item.items}/>
//
//                     </View>
//                 );
//             default:
//                 return null;
//         }
//     };
//
//     return (
//         <FlatList
//             data={new_Data}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderItem}
//             contentContainerStyle={[
//                 {
//                     paddingBottom: 50, // Thêm khoảng trống để cuộn mượt
//                     flexGrow: 1,
//                     backgroundColor: colors.Font_2,
//                     borderTopLeftRadius: 30,
//                     borderTopRightRadius: 30,
//                     paddingVertical: 20,
//                 }// Đảm bảo chiều cao FlatList
//             ]}
//             style={{ flex: 1, backgroundColor: colors.Yellow_Base }}
//         />
//     );
// }

// import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
// import { useRouter } from 'expo-router';
// import colors from "@/styles/colors";
// import { styles } from "@/components/home/Styles";
// import { Icon } from 'react-native-paper';
// import Carousel from 'react-native-reanimated-carousel';
// import { useSharedValue } from 'react-native-reanimated';
// import { useFoodContext } from "@/app/(home)/category/FoodContext";
// import FoodFlatList from '@/components/home/foodFlatList';
// import APIs, { endpoints } from '@/configs/APIs';
// import { useEffect, useState } from 'react';

// export default function HomePage() {
//     const router = useRouter();
//     const activeIndex = useSharedValue(0);
//     const { setSelectedFood } = useFoodContext();
//     const [new_Data, setNewData] = useState<any[]>([]);
//     const [categories, setCategories] = useState<any[]>([]);
//     const [promotion, setPromotion] = useState<any>({});
//     const [foodData, setFoodData] = useState<any[]>([]); // Dữ liệu thức ăn
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);

//     const fetchInitialData = async () => {
//         try {
//             // Tải dữ liệu categories và promotion
//             const dishType = await APIs.get(endpoints['dish_type']);
//             const promotionData = {
//                 type: 'promotion',
//                 text: 'Experience our delicious new dish',
//                 discount: '30% OFF',
//             }

//             const categories = dishType.data.map((item: any) => ({
//                 id: item.id,
//                 name: item.name,
//                 icon: { uri: item.image }
//             }));

//             setCategories(categories);
//             setPromotion(promotionData);
//         } catch (error) {
//             console.error("Error fetching initial data:", error);
//         }
//     };

//     const fetchFoodData = async (page = 1) => {
//         if (loading || !hasMore) return;

//         setLoading(true);
//         try {
//             const dish = await APIs.get(`${endpoints['dish']}?page=${page}`);

//             if (!dish.data || !Array.isArray(dish.data.results)) {
//                 console.error("Invalid food data format:", dish.data);
//                 setHasMore(false);
//                 return;
//             }

//             const food = dish.data.results.map((item: any) => ({
//                 id: item.id,
//                 name: item.name,
//                 price: `$${item.price}`,
//                 image: { uri: item.image },
//                 description: item.description,
//                 category: item.food_type,
//                 categoryID: item.food_type_id,
//             }));

//             setFoodData(prevData => (page === 1 ? food : [...prevData, ...food]));
//             setHasMore(dish.data.next !== null);
//             setCurrentPage(page);
//         } catch (error) {
//             console.error("Error fetching food data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchInitialData();
//         fetchFoodData(1); // Tải trang đầu tiên của thức ăn
//     }, []);

//     useEffect(() => {
//         if (currentPage > 1) {
//             fetchFoodData(currentPage); // Tải thêm dữ liệu thức ăn khi currentPage thay đổi
//         }
//     }, [currentPage]);

//     const handleLoadMore = () => {
//         if (!loading && hasMore) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const renderItem = ({ item }: any) => {
//         switch (item.type) {
//             case 'categories':
//                 return (
//                     <FlatList
//                         data={categories}
//                         horizontal
//                         keyExtractor={(category) => category.id.toString()}
//                         renderItem={({ item: category }) => (
//                             <View className='ml-4 flex-col justify-center items-center'>
//                                 <View className='h-20 rounded-full' style={{ backgroundColor: '#F3E9B5', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                                     <Pressable
//                                         onPress={() => router.push(`/category/${category.id.toString()}`)}
//                                         style={styles.categoryItem}
//                                     >
//                                         <Image source={category.icon}
//                                             style={styles.categoryIcon}
//                                             resizeMode="contain"
//                                         />
//                                     </Pressable>
//                                 </View>
//                                 <Text style={styles.categoryText}>{category.name}</Text>
//                             </View>
//                         )}
//                         showsHorizontalScrollIndicator={false}
//                         style={styles.categories}
//                         nestedScrollEnabled={true}
//                     />
//                 );
//             case 'bestSeller':
//                 return (
//                     <View style={styles.section}>
//                         <View className='flex-row justify-between items-center ml-4 mr-4'>
//                             <Text style={styles.sectionTitle}>{item.title}</Text>
//                             <Pressable onPress={() => router.push('/best_seller')} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <Text style={{ color: '#E95322', fontFamily: 'Spartan_600SemiBold' }}>View all</Text>
//                                 <Icon
//                                     source="chevron-right"
//                                     color={"#E95322"}
//                                     size={28}
//                                 />
//                             </Pressable>
//                         </View>
//                         <FlatList
//                             data={foodData} // Sử dụng foodData thay vì item.items
//                             horizontal
//                             keyExtractor={(product) => product.id.toString()}
//                             renderItem={({ item: product }) => (
//                                 <Pressable
//                                     style={styles.productItem}
//                                     onPress={() => {
//                                         setSelectedFood(product);
//                                         console.log(product);
//                                         router.push(`/category/${product.categoryID.toString()}/${product.id}`);
//                                     }}
//                                 >
//                                     <Image source={product.image} style={styles.productImage} />
//                                     <Text style={styles.categoryText}>{product.name}</Text>
//                                     <Text style={styles.productPrice}>{product.price}</Text>
//                                 </Pressable>
//                             )}
//                             showsHorizontalScrollIndicator={false}
//                             nestedScrollEnabled={true}
//                         />
//                     </View>
//                 );
//             case 'promotion':
//                 return (
//                     <View style={styles.promotionContainer}>
//                         <Carousel
//                             loop
//                             width={350}
//                             height={160}
//                             autoPlay={true}
//                             data={[1, 2, 3, 4]}
//                             scrollAnimationDuration={500}
//                             onSnapToItem={(index) => {
//                                 activeIndex.value = index;
//                             }}
//                             renderItem={({ index }) => (
//                                 <View style={styles.promotionSlide}>
//                                     <View style={styles.promotionContent}>
//                                         <View style={styles.promotionTextContainer}>
//                                             <Text style={styles.promotionText}>{promotion.text}</Text>
//                                             <Text style={styles.promotionDiscount}>{promotion.discount}</Text>
//                                         </View>
//                                         <Image
//                                             source={require('@/assets/images/bestSeller_pic/pic_1.png')}
//                                             style={styles.promotionImage}
//                                         />
//                                     </View>
//                                 </View>
//                             )}
//                         />
//                     </View>
//                 );
//             case 'recommend':
//                 return (
//                     <View style={styles.section}>
//                         <View className='flex-row justify-between items-center ml-4 mr-4'>
//                             <Text style={styles.sectionTitle}>{item.title}</Text>
//                             <Pressable onPress={() => router.push('/recommend_page')} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <Text style={{ color: '#E95322', fontFamily: 'Spartan_600SemiBold' }}>View all</Text>
//                                 <Icon
//                                     source="chevron-right"
//                                     color={"#E95322"}
//                                     size={28}
//                                 />
//                             </Pressable>
//                         </View>
//                         <FoodFlatList data={foodData} /> {/* Sử dụng foodData */}
//                     </View>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <FlatList
//             data={[
//                 { type: 'categories' },
//                 { type: 'bestSeller', title: 'Best Seller' },
//                 { type: 'promotion' },
//                 { type: 'recommend', title: 'Recommend' }
//             ]}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderItem}
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.1}
//             ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
//             contentContainerStyle={{
//                 paddingBottom: 50,
//                 flexGrow: 1,
//                 backgroundColor: colors.Font_2,
//                 borderTopLeftRadius: 30,
//                 borderTopRightRadius: 30,
//                 paddingVertical: 20,
//             }}
//             style={{ flex: 1, backgroundColor: colors.Yellow_Base }}
//         />
//     );
// }


// import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator,RefreshControl } from 'react-native';
// import { useRouter } from 'expo-router';
// import colors from "@/styles/colors";
// import { styles } from "@/components/home/Styles";
// import { Icon } from 'react-native-paper';
// import Carousel from 'react-native-reanimated-carousel';
// import { useSharedValue } from 'react-native-reanimated';
// import { useFoodContext } from "@/app/(home)/category/FoodContext";
// import FoodFlatList from '@/components/home/foodFlatList';
// import APIs, { endpoints } from '@/configs/APIs';
// import { useEffect, useState } from 'react';

// export default function HomePage() {
//     const router = useRouter();
//     const activeIndex = useSharedValue(0);
//     const { setSelectedFood } = useFoodContext();
//     const [categories, setCategories] = useState<any[]>([]);
//     const [promotion, setPromotion] = useState<any>({});
//     const [foodData, setFoodData] = useState<any[]>([]); // Dữ liệu thức ăn
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);

//     const fetchInitialData = async () => {
//         try {
//             // Tải dữ liệu categories và promotion
//             const dishType = await APIs.get(endpoints['dish_type']);
//             const promotionData = {
//                 type: 'promotion',
//                 text: 'Experience our delicious new dish',
//                 discount: '30% OFF',
//             }

//             const categories = dishType.data.map((item: any) => ({
//                 id: item.id,
//                 name: item.name,
//                 icon: { uri: item.image }
//             }));

//             setCategories(categories);
//             setPromotion(promotionData);
//         } catch (error) {
//             console.error("Error fetching initial data:", error);
//         }
//     };

//     const fetchFoodData = async (page = 1) => {
//         if (loading || !hasMore) return;

//         setLoading(true);
//         try {
//             const dish = await APIs.get(`${endpoints['dish']}?page=${page}`);

//             if (!dish.data || !Array.isArray(dish.data.results)) {
//                 console.error("Invalid food data format:", dish.data);
//                 setHasMore(false);
//                 return;
//             }

//             const food = dish.data.results.map((item: any) => ({
//                 id: item.id,
//                 name: item.name,
//                 price: `$${item.price}`,
//                 image: { uri: item.image },
//                 description: item.description,
//                 category: item.food_type,
//                 categoryID: item.food_type_id,
//             }));

//             // Nếu là trang 1 (làm mới), thay thế dữ liệu cũ
//             // Nếu là trang khác, thêm dữ liệu mới vào cuối
//             setFoodData(prevData => (page === 1 ? food : [...prevData, ...food]));
//             setHasMore(dish.data.next !== null);
//             setCurrentPage(page);
//         } catch (error) {
//             console.error("Error fetching food data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchInitialData();
//         fetchFoodData(1); // Tải trang đầu tiên của thức ăn
//     }, []);

//     useEffect(() => {
//         if (currentPage > 1) {
//             fetchFoodData(currentPage); // Tải thêm dữ liệu thức ăn khi currentPage thay đổi
//         }
//     }, [currentPage]);

//     const handleLoadMore = () => {
//         if (!loading && hasMore) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const onRefresh = async () => {
//         setRefreshing(true); // Bắt đầu làm mới
//         setCurrentPage(1); // Đặt lại trang hiện tại về 1
//         await fetchFoodData(1); // Tải lại dữ liệu từ trang đầu tiên
//         setRefreshing(false); // Kết thúc làm mới
//     };

//     const renderItem = ({ item }: any) => {
//         switch (item.type) {
//             case 'categories':
//                 return (
//                     <FlatList
//                         data={categories}
//                         horizontal
//                         keyExtractor={(category) => category.id.toString()}
//                         renderItem={({ item: category }) => (
//                             <View className='ml-4 flex-col justify-center items-center'>
//                                 <View className='h-20 rounded-full' style={{ backgroundColor: '#F3E9B5', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                                     <Pressable
//                                         onPress={() => router.push(`/category/${category.id.toString()}`)}
//                                         style={styles.categoryItem}
//                                     >
//                                         <Image source={category.icon}
//                                             style={styles.categoryIcon}
//                                             resizeMode="contain"
//                                         />
//                                     </Pressable>
//                                 </View>
//                                 {/* Wrap category.name in a <Text> component */}
//                                 <Text style={styles.categoryText}>{category.name}</Text>
//                             </View>
//                         )}
//                         showsHorizontalScrollIndicator={false}
//                         style={styles.categories}
//                         nestedScrollEnabled={true}
//                     />
//                 );
//             case 'bestSeller':
//                 return (
//                     <View style={styles.section}>
//                         <View className='flex-row justify-between items-center ml-4 mr-4'>
//                             {/* Wrap item.title in a <Text> component */}
//                             <Text style={styles.sectionTitle}>{item.title}</Text>
//                             <Pressable onPress={() => router.push('/best_seller')} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 {/* Wrap "View all" in a <Text> component */}
//                                 <Text style={{ color: '#E95322', fontFamily: 'Spartan_600SemiBold' }}>View all</Text>
//                                 <Icon
//                                     source="chevron-right"
//                                     color={"#E95322"}
//                                     size={28}
//                                 />
//                             </Pressable>
//                         </View>
//                         <FlatList
//                             data={foodData}
//                             horizontal
//                             keyExtractor={(product) => product.id.toString()}
//                             renderItem={({ item: product }) => (
//                                 <Pressable
//                                     style={styles.productItem}
//                                     onPress={() => {
//                                         setSelectedFood(product);
//                                         console.log(product);
//                                         router.push(`/category/${product.categoryID.toString()}/${product.id}`);
//                                     }}
//                                 >
//                                     <Image source={product.image} style={styles.productImage} />
//                                     {/* Wrap product.name and product.price in <Text> components */}
//                                     <Text style={styles.categoryText}>{product.name}</Text>
//                                     <Text style={styles.productPrice}>{product.price}</Text>
//                                 </Pressable>
//                             )}
//                             showsHorizontalScrollIndicator={false}
//                             nestedScrollEnabled={true}
//                         />
//                     </View>
//                 );
//             case 'promotion':
//                 return (
//                     <View style={styles.promotionContainer}>
//                         <Carousel
//                             loop
//                             width={350}
//                             height={160}
//                             autoPlay={true}
//                             data={[1, 2, 3, 4]}
//                             scrollAnimationDuration={500}
//                             onSnapToItem={(index) => {
//                                 activeIndex.value = index;
//                             }}
//                             renderItem={({ index }) => (
//                                 <View style={styles.promotionSlide}>
//                                     <View style={styles.promotionContent}>
//                                         <View style={styles.promotionTextContainer}>
//                                             {/* Wrap promotion.text and promotion.discount in <Text> components */}
//                                             <Text style={styles.promotionText}>{promotion.text}</Text>
//                                             <Text style={styles.promotionDiscount}>{promotion.discount}</Text>
//                                         </View>
//                                         <Image
//                                             source={require('@/assets/images/bestSeller_pic/pic_1.png')}
//                                             style={styles.promotionImage}
//                                         />
//                                     </View>
//                                 </View>
//                             )}
//                         />
//                     </View>
//                 );
//             case 'recommend':
//                 return (
//                     <View style={styles.section}>
//                         <View className='flex-row justify-between items-center ml-4 mr-4'>
//                             {/* Wrap item.title in a <Text> component */}
//                             <Text style={styles.sectionTitle}>{item.title}</Text>
//                             <Pressable onPress={() => router.push('/recommend_page')} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 {/* Wrap "View all" in a <Text> component */}
//                                 <Text style={{ color: '#E95322', fontFamily: 'Spartan_600SemiBold' }}>View all</Text>
//                                 <Icon
//                                     source="chevron-right"
//                                     color={"#E95322"}
//                                     size={28}
//                                 />
//                             </Pressable>
//                         </View>
//                         <FoodFlatList data={foodData} />
//                     </View>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <FlatList
//             data={[
//                 { type: 'categories' },
//                 { type: 'bestSeller', title: 'Best Seller' },
//                 { type: 'promotion' },
//                 { type: 'recommend', title: 'Recommend' }
//             ]}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderItem}
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.1}
//             ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
//             refreshControl={
//                 <RefreshControl
//                     refreshing={refreshing} // Trạng thái làm mới
//                     onRefresh={onRefresh} // Hàm được gọi khi làm mới
//                     colors={[colors.Orange_Base]} // Màu của indicator
//                     tintColor={colors.Orange_Base} // Màu của indicator (iOS)
//                 />
//             }
//             contentContainerStyle={{
//                 paddingBottom: 50,
//                 flexGrow: 1,
//                 backgroundColor: colors.Font_2,
//                 borderTopLeftRadius: 30,
//                 borderTopRightRadius: 30,
//                 paddingVertical: 20,
//             }}
//             style={{ flex: 1, backgroundColor: colors.Yellow_Base }}
//         />
//     );
// }

import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";
import { Icon } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useFoodContext } from "@/app/(home)/category/FoodContext";
import FoodFlatList from '@/components/home/foodFlatList';
import APIs, { endpoints } from '@/configs/APIs';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const router = useRouter();
    const activeIndex = useSharedValue(0);
    const { setSelectedFood } = useFoodContext();
    const [new_Data, setNewData] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [promotion, setPromotion] = useState<any>({});
    const [foodData, setFoodData] = useState<any[]>([]); // Dữ liệu thức ăn
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Trạng thái làm mới

    const fetchInitialData = async () => {
        try {
            // Tải dữ liệu categories và promotion
            const dishType = await APIs.get(endpoints['dish_type']);
            const promotionData = {
                type: 'promotion',
                text: 'Experience our delicious new dish',
                discount: '30% OFF',
            }

            const categories = dishType.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                icon: { uri: item.image }
            }));

            setCategories(categories);
            setPromotion(promotionData);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    const fetchFoodData = async (page = 1) => {
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

            setFoodData(prevData => (page === 1 ? food : [...prevData, ...food]));
            setHasMore(dish.data.next !== null);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching food data:", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true); // Bắt đầu làm mới
        setCurrentPage(1);
        await fetchInitialData(); // Đặt lại trang hiện tại về 1
        await fetchFoodData(1); // Tải lại dữ liệu từ trang đầu tiên
        setRefreshing(false); // Kết thúc làm mới
    };

    useEffect(() => {
        fetchInitialData();
        fetchFoodData(1); // Tải trang đầu tiên của thức ăn
    }, []);

    useEffect(() => {
        if (currentPage > 1) {
            fetchFoodData(currentPage); // Tải thêm dữ liệu thức ăn khi currentPage thay đổi
        }
    }, [currentPage]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const renderItem = ({ item }: any) => {
        switch (item.type) {
            case 'categories':
                return (
                    <FlatList
                        data={categories}
                        horizontal
                        keyExtractor={(category) => category.id.toString()}
                        renderItem={({ item: category }) => (
                            <View className='ml-4 flex-col justify-center items-center'>
                                <View className='h-20 rounded-full' style={{ backgroundColor: '#F3E9B5', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Pressable
                                        onPress={() => router.push(`/category/${category.id.toString()}`)}
                                        style={styles.categoryItem}
                                    >
                                        <Image source={category.icon}
                                            style={styles.categoryIcon}
                                            resizeMode="contain"
                                        />
                                    </Pressable>
                                </View>
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        style={styles.categories}
                        nestedScrollEnabled={true}
                    />
                );
            case 'bestSeller':
                return (
                    <View style={styles.section}>
                        <View className='flex-row justify-between items-center ml-4 mr-4'>
                            <Text style={styles.sectionTitle}>{item.title}</Text>
                            <Pressable onPress={() => router.push('/best_seller')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#E95322', fontFamily: 'Spartan_600SemiBold' }}>View all</Text>
                                <Icon
                                    source="chevron-right"
                                    color={"#E95322"}
                                    size={28}
                                />
                            </Pressable>
                        </View>
                        <FlatList
                            data={foodData}
                            horizontal
                            keyExtractor={(product) => product.id.toString()}
                            renderItem={({ item: product }) => (
                                <Pressable
                                    style={styles.productItem}
                                    onPress={() => {
                                        setSelectedFood(product);
                                        console.log(product);
                                        router.push(`/category/${product.categoryID.toString()}/${product.id}`);
                                    }}
                                >
                                    <Image source={product.image} style={styles.productImage} />
                                    <Text style={styles.categoryText}>{product.name}</Text>
                                    <Text style={styles.productPrice}>{product.price}</Text>
                                </Pressable>
                            )}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}
                        />
                    </View>
                );
            case 'promotion':
                return (
                    <View style={styles.promotionContainer}>
                        <Carousel
                            loop
                            width={350}
                            height={160}
                            autoPlay={true}
                            data={[1, 2, 3, 4]}
                            scrollAnimationDuration={500}
                            onSnapToItem={(index) => {
                                activeIndex.value = index;
                            }}
                            renderItem={({ index }) => (
                                <View style={styles.promotionSlide}>
                                    <View style={styles.promotionContent}>
                                        <View style={styles.promotionTextContainer}>
                                            <Text style={styles.promotionText}>{promotion.text}</Text>
                                            <Text style={styles.promotionDiscount}>{promotion.discount}</Text>
                                        </View>
                                        <Image
                                            source={require('@/assets/images/bestSeller_pic/pic_1.png')}
                                            style={styles.promotionImage}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                );
            case 'recommend':
                return (
                    <View style={styles.section}>
                        <View className='flex-row justify-between items-center ml-4 mr-4'>
                            <Text style={styles.sectionTitle}>{item.title}</Text>
                            <Pressable onPress={() => router.push('/recommend_page')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#E95322', fontFamily: 'Spartan_600SemiBold' }}>View all</Text>
                                <Icon
                                    source="chevron-right"
                                    color={"#E95322"}
                                    size={28}
                                />
                            </Pressable>
                        </View>
                        <FoodFlatList data={foodData} />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <FlatList
            data={[
                { type: 'categories' },
                { type: 'bestSeller', title: 'Best Seller' },
                { type: 'promotion' },
                { type: 'recommend', title: 'Recommend' }
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.Orange_Base]}
                    tintColor={colors.Orange_Base}
                />
            }
            contentContainerStyle={{
                paddingBottom: 50,
                flexGrow: 1,
                backgroundColor: colors.Font_2,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingVertical: 20,
            }}
            style={{ flex: 1, backgroundColor: colors.Yellow_Base }}
        />
    );
}