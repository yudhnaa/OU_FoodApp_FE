import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import {router, Link} from "expo-router";
import colors from "@/styles/colors";
import { styles } from "@/components/home/Styles";
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-paper'

const data = [
    {
      type: 'categories',
      items: [
        { id: '1', name: 'Snacks', icon: require('@/assets/images/logo/Snacks.png') },
        { id: '2', name: 'Meal', icon: require('@/assets/images/logo/Meals.png') },
        { id: '3', name: 'Vegan', icon: require('@/assets/images/logo/Vegan.png') },
        { id: '4', name: 'Dessert', icon: require('@/assets/images/logo/Desserts.png') },
        { id: '5', name: 'Drinks', icon: require('@/assets/images/logo/Drinks.png') },
        { id: '6', name: 'More...', icon: require('@/assets/images/logo/Snacks.png') },
      ],
    },
    {
      type: 'bestSeller',
      title: 'Best Seller',
      items: [
        { id: '1',name : 'Food 1', price: '$103.0', image: require('@/assets/images/bestSeller_pic/pic_1.png') },
        { id: '2',name : 'Food 2', price: '$50.0', image: require('@/assets/images/bestSeller_pic/pic_2.png') },
        { id: '3',name : 'Food 3', price: '$12.99', image: require('@/assets/images/bestSeller_pic/pic_3.png') },
        { id: '4',name : 'Food 4', price: '$8.20', image: require('@/assets/images/bestSeller_pic/pic_4.png') },
      ],
    },
    {
      type: 'promotion',
      text: 'Experience our delicious new dish',
      discount: '30% OFF',
    },
    {
      type: 'recommend',
      title: 'Recommend',
      items: [
        { id: '1',name : 'Food 1', price: '$10.0', image: require('@/assets/images/bestSeller_pic/pic_1.png') },
        { id: '2',name : 'Food 2', price: '$25.0', image: require('@/assets/images/bestSeller_pic/pic_2.png') },
        { id: '3',name : 'Food 3', price: '$10.0', image: require('@/assets/images/bestSeller_pic/pic_3.png')},
        { id: '4',name : 'Food 4', price: '$25.0', image: require('@/assets/images/bestSeller_pic/pic_4.png') },
        { id: '5',name : 'Food 5', price: '$10.0', image: require('@/assets/images/bestSeller_pic/pic_1.png') },
        { id: '6',name : 'Food 6', price: '$25.0', image: require('@/assets/images/bestSeller_pic/pic_2.png') },
      ],
    },
  ];
  
export default function HomePage() {
const router = useRouter();

const renderItem = ({ item }) => {
    switch (item.type) {
    case 'categories':
        return (
        <FlatList
            data={item.items}
            horizontal // cuộn theo chiều ngang
            keyExtractor={(category) => category.id}
            renderItem={({ item: category }) => (
            <View className='ml-4 flex-col justify-center items-center'>
                <View className='h-20 rounded-full' style={{backgroundColor: '#F3E9B5',flex : 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Pressable
                        onPress={() => router.push(`/category/${category.name}`)} // chuyển đến trang food với category.name
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
                <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#E95322'}}>View all</Text>
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
            renderItem={({ item: product }) => (
                <View style={styles.productItem}>
                <Image source={product.image} style={styles.productImage} />
                <Text style={styles.categoryText}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                </View>
            )}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            />
        </View>
        );
    case 'promotion':
        return (
        <View style={styles.promotion}>
            <Text style={styles.promotionText}>{item.text}</Text>
            <Text style={styles.promotionDiscount}>{item.discount}</Text>
        </View>
        );
    case 'recommend':
        return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <FlatList
            data={item.items}
            numColumns={2} // Set number of columns to 2 for vertical scrolling
            keyExtractor={(product) => product.id}
            renderItem={({ item: product }) => (
                <View style={styles.productItem}>
                <Image source={ product.image } style={styles.productImage} />
                <Text style={styles.categoryText}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            />
        </View>
        );
    default:
        return null;
    }
};

return (
    <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={[
                {paddingBottom: 50, // Thêm khoảng trống để cuộn mượt
                flexGrow: 1,
                backgroundColor: colors.Font_2,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingVertical: 20,
             }// Đảm bảo chiều cao FlatList
            ]}
            style={{ flex: 1, backgroundColor: colors.Yellow_Base}}
        />
);
}