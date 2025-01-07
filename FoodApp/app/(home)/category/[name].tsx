import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, FlatList, Pressable, StyleSheet } from "react-native";
import { styles } from "@/components/home/Styles";
import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { Icon } from "react-native-paper";
import { router } from "expo-router";
import { useFoodContext } from "./FoodContext";

const menuData = {
    Snacks: [
        {
            id: '1',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_1.png'),
            rating: 4.5,
        },
        {
            id: '2',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 5.0,
        },
        {
            id: '3',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_3.png'),
            rating: 5.0,
        },
        {
            id: '4',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_4.png'),
            rating: 5.0,
        },
        {
            id: '5',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_1.png'),
            rating: 5.0,
        },
        {
            id: '6',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 5.0,
        },
        {
            id: '7',
            name: 'Mexican Appetizer',
            description: 'Tortilla Chips With Toppings',
            price: 15.00,
            image: require('@/assets/images/bestSeller_pic/pic_3.png'),
            rating: 5.0,
        },
        // Thêm các món ăn khác
    ],
    Meal: [
        {
            id: '1',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '2',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '3',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_3.png'),
            rating: 4.0,
        },
        {
            id: '4',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_4.png'),
            rating: 4.0,
        },
        {
            id: '5',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_1.png'),
            rating: 4.0,
        },
        // Thêm các món ăn khác
    ],
    Desserts: [
        {
            id: '1',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '2',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '3',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_3.png'),
            rating: 4.0,
        },
        {
            id: '4',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_4.png'),
            rating: 4.0,
        },
        {
            id: '5',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_1.png'),
            rating: 4.0,
        },
    ],
    Drinks: [
        {
            id: '1',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '2',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '3',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_3.png'),
            rating: 4.0,
        },
        {
            id: '4',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_4.png'),
            rating: 4.0,
        },
        {
            id: '5',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_1.png'),
            rating: 4.0,
        },
    ],
    Vegan: [
        {
            id: '1',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '2',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_2.png'),
            rating: 4.0,
        },
        {
            id: '3',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_3.png'),
            rating: 4.0,
        },
        {
            id: '4',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_4.png'),
            rating: 4.0,
        },
        {
            id: '5',
            name: 'Pork Skewer',
            description: 'Marinated in a rich blend of spices, then grilled to perfection, served with a side of zesty dipping sauce.',
            price: 12.99,
            image: require('@/assets/images/bestSeller_pic/pic_1.png'),
            rating: 4.0,
        },
    ]
    // Thêm các category khác
};

export default function CategoryPage() {
    const { name } = useLocalSearchParams();
    const categoryMenu = menuData[name as keyof typeof menuData] || [];
    const { setSelectedFood } = useFoodContext();

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
                    <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <View style={styles.seperateLine}></View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.backGround}>
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
                data={categoryMenu}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.menuList}
            />
        </View>
    );
}
