import { View, Text, StyleSheet, FlatList, Image, Pressable, ScrollView, TouchableOpacity, Touchable } from 'react-native';
import { styles } from '@/components/home/Styles';
import APIs, { endpoints } from '@/configs/APIs';
import { useEffect, useState } from 'react';
import colors from '@/styles/colors';
import PriceSlider from '@/components/home/priceSlider';
import { Rating } from '@kolking/react-native-rating';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSearch } from '@/components/context/SearchContext';

type Category = {
    id: string;
    name: string;
    icon: { uri: string };
}

export default function FilterPage() {
    const router = useRouter();
    const { filters, setFilters, performSearch } = useSearch();
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(filters.food_type || null);
    const [priceRange, setPriceRange] = useState({
        min: filters.min_price || 0,
        max: filters.max_price || 1000
    });
    const [rating, setRating] = useState<number>(0);

    const handleApplyFilters = () => {
        const newFilters = {
            ...filters,
            min_price: priceRange.min,
            max_price: priceRange.max,
            food_type: selectedCategory !== null ? selectedCategory : undefined,
            rating: rating > 0 ? rating : undefined,
            // Preserve the existing search keywords
            store_keyword: filters.store_keyword,
            dish_keyword: filters.dish_keyword
        };

        setFilters(newFilters);
        performSearch(newFilters);
        router.back();
    };



    const loadCategories = async () => {
        try {
            const res = await APIs.get(endpoints['dish_type']);
            const mappedData = res.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                icon: { uri: item.image || 'https://placehold.co/150' }
            }));
            setCategories(mappedData);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(Number(categoryId));
    };

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const handlePriceChange = (values: number[]) => {
        setPriceRange({
            min: values[0],
            max: values[1]
        });
    };

    const handleReset = () => {
        const emptyFilters = {
            min_price: undefined,
            max_price: undefined,
            food_type: undefined,
            rating: undefined
        };

        router.setParams(emptyFilters);
        setSelectedCategory(null);
        setPriceRange({ min: 0, max: 1000 });
        setRating(0);
    };

    return (
        <View style={styles.backGround}>
            <ScrollView style={[styles.bodyPage, { padding: 15 }]}>
                <View style={styles1.section}>
                    <Text style={styles1.sectionTitle}>Categories</Text>
                    <FlatList
                        data={categories}
                        horizontal
                        keyExtractor={(category) => category.id}
                        renderItem={({ item }) => (
                            <View style={styles1.categoryContainer}>
                                <Pressable
                                    style={[
                                        styles1.categoryButton,
                                        selectedCategory === Number(item.id) && styles1.selectedCategory
                                    ]}
                                    onPress={() => handleCategorySelect(item.id)}
                                >
                                    <Image
                                        source={item.icon}
                                        style={styles1.categoryIcon}
                                        resizeMode="contain"
                                    />
                                </Pressable>
                                <Text style={styles1.categoryText}>{item.name}</Text>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles1.section}>
                    <Text style={styles1.sectionTitle}>Rating</Text>
                    <Rating
                        size={30}
                        rating={rating}
                        onChange={handleRatingChange}
                        variant="stars-outline"
                        style={styles1.rating}
                    />
                </View>

                <View style={styles1.section}>
                    <Text style={styles1.sectionTitle}>Price Range</Text>
                    <PriceSlider onValueChange={handlePriceChange} />
                </View>

                <TouchableOpacity
                    style={styles1.applyButton}
                    onPressIn={handleApplyFilters}
                >
                    <Text style={styles1.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles1 = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Spartan_600SemiBold',
        color: colors.Orange_Base,
    },
    resetText: {
        color: colors.Orange_Base,
        fontFamily: 'Spartan_500Medium',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Spartan_500Medium',
        marginBottom: 15,
    },
    categoryContainer: {
        alignItems: 'center',
        marginRight: 15,
    },
    categoryButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.Yellow_2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    selectedCategory: {
        backgroundColor: colors.Yellow_Base,
    },
    categoryIcon: {
        width: 40,
        height: 40,
    },
    categoryText: {
        fontSize: 12,
        fontFamily: 'Spartan_500Medium',
        textAlign: 'center',
    },
    rating: {
        marginTop: 10,
    },
    applyButton: {
        backgroundColor: colors.Orange_Base,
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Spartan_600SemiBold',
    },
});