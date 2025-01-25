import {View, Text, FlatList, Image, Pressable} from 'react-native';
import colors from "@/styles/colors";
import {styles} from "@/components/home/Styles";
import {useRouter} from 'expo-router';
import {Icon} from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {useFoodContext} from "@/app/(home)/category/FoodContext";
import FoodFlatList from '@/components/home/foodFlatList';
import APIs, {endpoints, authApi} from '@/configs/APIs';
import {useEffect, useState} from 'react';

export default function HomePage() {
    const router = useRouter();
    const activeIndex = useSharedValue(0);
    const {setSelectedFood} = useFoodContext();
    const [new_Data, setNewData] = useState<Array<{
        type: string;
        items?: any;
        title?: string;
        text?: string;
        discount?: string
    }>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let checkUser = await (await authApi()).get(endpoints.get_user);
                if (checkUser.status !== 200) {
                    alert('Please login to continue');
                    router.dismissAll()
                    router.replace('/login');
                }

                const dishType = await APIs.get(endpoints['dish_type']);
                const dish = await APIs.get(endpoints['dish']);

                const categories = dishType.data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    icon: {uri: item.image}
                }));

                const food = dish.data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    price: `$${item.price}`,
                    image: {uri: item.image},
                    description: item.description,
                    category: item.food_type,
                    categoryID: item.food_type_id,
                }));

                const formattedData = [
                    {
                        type: 'categories',
                        items: categories
                    },
                    {
                        type: 'bestSeller',
                        title: 'Best Seller',
                        items: food
                    },
                    {
                        type: 'promotion',
                        text: 'Experience our delicious new dish',
                        discount: '30% OFF',
                    },
                    {
                        type: 'recommend',
                        title: 'Recommend',
                        items: food
                    }
                ];

                setNewData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({item}: {
        item: { type: string; items?: any; title?: string; text?: string; discount?: string }
    }) => {
        switch (item.type) {
            case 'categories':
                return (
                    <FlatList
                        data={item.items}
                        horizontal // cuộn theo chiều ngang
                        keyExtractor={(category) => category.id}
                        renderItem={({item: category}) => (
                            <View className='ml-4 flex-col justify-center items-center'>
                                <View className='h-20 rounded-full' style={{
                                    backgroundColor: '#F3E9B5',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Pressable
                                        onPress={() => router.navigate(`/category/${category.id.toString()}`)}
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
                                       style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#E95322', fontFamily: 'Spartan_600SemiBold'}}>View all</Text>
                                <Icon
                                    source="chevron-right"
                                    color={"#E95322"}
                                    size={28}
                                />
                            </Pressable>
                        </View>
                        <FlatList
                            data={item.items}
                            horizontal
                            keyExtractor={(product) => product.id}
                            renderItem={({item: product}) => (
                                <Pressable
                                    style={styles.productItem}
                                    onPress={() => {
                                        setSelectedFood(product);
                                        console.log(product);
                                        router.push(`/category/${product.categoryID.toString()}/${product.id}`);
                                    }}
                                >
                                    <Image source={product.image} style={styles.productImage}/>
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
                                activeIndex.value = index; // Update shared value
                            }}
                            renderItem={({index}) => (
                                <View style={styles.promotionSlide}>
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
                                       style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#E95322', fontFamily: 'Spartan_600SemiBold'}}>View all</Text>
                                <Icon
                                    source="chevron-right"
                                    color={"#E95322"}
                                    size={28}
                                />
                            </Pressable>
                        </View>

                        <FoodFlatList data={item.items}/>

                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <FlatList
            data={new_Data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={[
                {
                    paddingBottom: 50, // Thêm khoảng trống để cuộn mượt
                    flexGrow: 1,
                    backgroundColor: colors.Font_2,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingVertical: 20,
                }// Đảm bảo chiều cao FlatList
            ]}
            style={{flex: 1, backgroundColor: colors.Yellow_Base}}
        />
    );
}