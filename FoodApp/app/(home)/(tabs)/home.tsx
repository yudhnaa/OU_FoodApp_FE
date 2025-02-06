import { View, Text, FlatList, Image, Pressable, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";
import { useFocusEffect, useRouter } from 'expo-router';
import { Icon } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue, useDerivedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useFoodContext } from "@/app/(home)/category/FoodContext";
import FoodFlatList from '@/components/home/foodFlatList';
import APIs, { endpoints, authApi } from '@/configs/APIs';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from "@/components/AuthContext";


import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
});


export default function HomePage() {
    const router = useRouter();
    const { setSelectedFood } = useFoodContext();
    const activeIndex = useSharedValue(0);
    const [categories, setCategories] = useState<any[]>([]);
    const [promotion, setPromotion] = useState<any>({});
    const [foodData, setFoodData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const { access_token, setUserInfo, clearToken } = useAuth();

    const fetchInitialData = async () => {
        try {
            const dishType = await APIs.get(endpoints['dish_type']);
            const promotionData = {
                type: 'promotion',
                text: 'Experience our delicious new dish',
                discount: '30% OFF',
            };

            const categories = dishType.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                icon: { uri: item.image }
            }));

            // console.log("Item:", dishType.data)

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
                storeId: item.store_id,
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
        setRefreshing(true);
        setCurrentPage(1);
        await fetchInitialData();
        await fetchFoodData(1);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchInitialData();
        fetchFoodData(1);
    }, []);


    useEffect(() => {
        if (currentPage > 1) {
            fetchFoodData(currentPage);
        }
    }, [currentPage]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            console.log('Access token:', access_token);
            const res = await authApi(access_token).get(endpoints.get_user);
            console.log('User info22222:', res.data);
            setUserInfo(res.data);
        } catch (ex) {
            console.error('Error fetching user info:', ex);
            Alert.alert("Hey Bestie", 'Please login to continue');
            if (router.canDismiss()) {
                router.dismissAll();
                clearToken();
            }
            router.replace('/welcome');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    const derivedIndex = useDerivedValue(() => {
        return activeIndex.value;
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: derivedIndex.value * 10 }],
        };
    });

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
                                <View className='h-20 rounded-full' style={{
                                    backgroundColor: '#F3E9B5',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
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
                            <Pressable onPress={() => router.push('/best_seller')}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                        // console.log(product);
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
                            data={[promotion]}
                            scrollAnimationDuration={500}
                            onSnapToItem={(index) => {
                                activeIndex.value = index;
                            }}
                            renderItem={({ item }) => (
                                <View style={[styles.promotionSlide, animatedStyle]}>
                                    <View style={styles.promotionContent}>
                                        <View style={styles.promotionTextContainer}>
                                            <Text style={styles.promotionText}>{item.text}</Text>
                                            <Text style={styles.promotionDiscount}>{item.discount}</Text>
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
                            <Pressable onPress={() => router.push('/recommend_page')}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
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