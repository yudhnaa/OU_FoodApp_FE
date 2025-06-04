import { Text, View, Pressable, StyleSheet, FlatList, Image, ActivityIndicator,RefreshControl } from "react-native";
import { useRouter } from 'expo-router';
import categoryIcons from "@/components/home/categoryIcons";
import { useFoodContext } from "@/app/(home)/category/FoodContext";
import { styles } from "@/components/home/Styles";
import colors from "@/styles/colors";
import { useState } from "react";

type FoodItem = {
    id: string;
    name: string;
    price: string;
    image: { uri: string };
    category: string;
    empty?: boolean;
};

type FoodFlatListProps = {
    data: FoodItem[];
    loading?: boolean;
    hasMore?: boolean;
    loadMore?: () => void;
    onRefresh?: () => void;
};

const FoodFlatList = ({ data, loading, hasMore, loadMore,onRefresh }: FoodFlatListProps) => {
    const { setSelectedFood } = useFoodContext();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true); // Bắt đầu refresh
        if (onRefresh) {
            await onRefresh(); // Gọi hàm onRefresh từ prop
        }
        setRefreshing(false); // Kết thúc refresh
    };
    

    const renderItem = ({ item }: { item: FoodItem }) => {
        if (item.empty) {
            return <View style={[styles.productItem]} />; // Only keep spacing
        }
        return (
            <Pressable
                style={styles.productItem}
                onPress={() => {
                    setSelectedFood(item);
                    router.push(`/category/${item.category}/${item.id}`);
                }}
            >
                <View style={styles1.imageContainer}>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={styles1.iconContainer}>
                        <Image
                            source={categoryIcons[item.category]}
                            style={styles1.iconImage}
                        />
                    </View>
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </Pressable>
        );
    };


    const formatData = (data: FoodItem[], numColumns: number) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

        if (numberOfElementsLastRow !== 0) {
            numberOfElementsLastRow = numColumns - numberOfElementsLastRow;
            data = [...data, ...Array(numberOfElementsLastRow).fill({ empty: true })];
        }
        return data;
    };

    return (
        <FlatList
            data={formatData(data, 2)}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            onEndReached={loadMore} // Kích hoạt khi cuộn đến cuối danh sách
            onEndReachedThreshold={0.1} // Kích hoạt khi còn cách cuối danh sách 10%
            ListFooterComponent={
                loading ? (
                    <ActivityIndicator size="large" color={colors.Orange_Base} />
                ) : null
            } // Hiển thị loading indicator khi đang tải
            refreshControl={
                <RefreshControl
                    refreshing={refreshing} // Trạng thái refresh
                    onRefresh={handleRefresh} // Hàm xử lý khi refresh
                    colors={[colors.Orange_Base]} // Màu của loading indicator
                    tintColor={colors.Orange_Base} // Màu của loading indicator
                />
            }
        />
    );
};

const styles1 = StyleSheet.create({
    imageContainer: {
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 5,
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    txt: {
        fontSize: 15,
        fontFamily: "Spartan_700Bold",
        color: colors.Orange_Base,
    },
});

export default FoodFlatList;

