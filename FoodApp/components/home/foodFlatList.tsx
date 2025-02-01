// import { Text, View, Pressable, StyleSheet, FlatList, Image } from "react-native";
// import { useRouter } from 'expo-router';
// import categoryIcons from "@/components/home/categoryIcons";
// import { useFoodContext } from "@/app/(home)/category/FoodContext";
// import { styles } from "@/components/home/Styles";
// import colors from "@/styles/colors";
//
// const FoodFlatList = ({ data }: { data: any }) => {
//     const { setSelectedFood } = useFoodContext();
//     const router = useRouter();
//
//     const renderItem = ({ item }: { item: any }) => {
//         if (item.empty) {
//             return <View style={[styles.productItem]} />; // Chỉ giữ spacing
//         }
//         return (
//             <Pressable
//                 style={styles.productItem}
//                 onPress={() => {
//                     setSelectedFood(item);
//                     router.push(`/category/${item.category}/${item.id}`);
//                 }}
//             >
//                 <View style={styles1.imageContainer}>
//                     <Image source={item.image} style={styles.productImage} />
//                     <View style={styles1.iconContainer}>
//                         <Image
//                             source={categoryIcons[item.category as keyof typeof categoryIcons]}
//                             style={styles1.iconImage}
//                         />
//                     </View>
//                 </View>
//                 <Text style={styles.categoryText}>{item.name}</Text> {/* Đảm bảo bọc trong <Text> */}
//                 <Text style={styles.productPrice}>{item.price}</Text> {/* Đảm bảo bọc trong <Text> */}
//             </Pressable>
//         );
//     };
//
//     const formatData = (data: any, numColumns: any) => {
//         const numberOfFullRows = Math.floor(data.length / numColumns);
//         let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
//
//         if (numberOfElementsLastRow !== 0) {
//             numberOfElementsLastRow = numColumns - numberOfElementsLastRow;
//             data = [...data, ...Array(numberOfElementsLastRow).fill({ empty: true })];
//         }
//         return data;
//     };
//
//     return (
//         <FlatList
//             data={formatData(data, 2)}
//             numColumns={2}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderItem}
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}
//         />
//     );
// };
//
// const styles1 = StyleSheet.create({
//     txt: {
//         fontSize: 15,
//         fontFamily: "Spartan_700Bold",
//         color: colors.Orange_Base,
//         textAlign: 'center',
//     },
//     txtContainer: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginBottom: 20
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         overflow: 'hidden',
//     },
//     iconContainer: {
//         position: 'absolute',
//         left: 20,
//         padding: 8,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//     },
//     iconImage: {
//         resizeMode: 'contain',
//     },
//     itemInvisible: {
//         backgroundColor: 'transparent',
//     }
// });
//
//
// export default FoodFlatList;

// import { Text, View, Pressable, StyleSheet, FlatList, Image } from "react-native";
// import { useRouter } from 'expo-router';
// import categoryIcons from "@/components/home/categoryIcons";
// import { useFoodContext } from "@/app/(home)/category/FoodContext";
// import { styles } from "@/components/home/Styles";
// import colors from "@/styles/colors";

// type FoodItem = {
//     id: string;
//     name: string;
//     price: string;
//     image: { uri: string };
//     category: string;
//     empty?: boolean;
// };

// const FoodFlatList = ({ data }: { data: FoodItem[] }) => {
//     const { setSelectedFood } = useFoodContext();
//     const router = useRouter();

//     const renderItem = ({ item }: { item: FoodItem }) => {
//         if (item.empty) {
//             return <View style={[styles.productItem]} />; // Only keep spacing
//         }
//         return (
//             <Pressable
//                 style={styles.productItem}
//                 onPress={() => {
//                     setSelectedFood(item);
//                     router.push(`/category/${item.category}/${item.id}`);
//                 }}
//             >
//                 <View style={styles1.imageContainer}>
//                     <Image source={item.image} style={styles.productImage} />
//                     <View style={styles1.iconContainer}>
//                         <Image
//                             source={categoryIcons[item.category]}
//                             style={styles1.iconImage}
//                         />
//                     </View>
//                 </View>
//                 <Text style={styles.categoryText}>{item.name}</Text>
//                 <Text style={styles.productPrice}>{item.price}</Text>
//             </Pressable>
//         );
//     };

//     const formatData = (data: FoodItem[], numColumns: number) => {
//         const numberOfFullRows = Math.floor(data.length / numColumns);
//         let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

//         if (numberOfElementsLastRow !== 0) {
//             numberOfElementsLastRow = numColumns - numberOfElementsLastRow;
//             data = [...data, ...Array(numberOfElementsLastRow).fill({ empty: true })];
//         }
//         return data;
//     };

//     return (
//         <FlatList
//             data={formatData(data, 2)}
//             numColumns={2}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderItem}
//             showsVerticalScrollIndicator={false}
//             // nestedScrollEnabled={true}
//         />
//     );
// };

// const styles1 = StyleSheet.create({
//     txt: {
//         fontSize: 15,
//         fontFamily: "Spartan_700Bold",
//         color: colors.Orange_Base,
//         textAlign: 'center',
//     },
//     txtContainer: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginBottom: 20
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         overflow: 'hidden',
//     },
//     iconContainer: {
//         position: 'absolute',
//         left: 20,
//         padding: 8,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//     },
//     iconImage: {
//         resizeMode: 'contain',
//     },
//     itemInvisible: {
//         backgroundColor: 'transparent',
//     }
// });

// export default FoodFlatList;

import { Text, View, Pressable, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import categoryIcons from "@/components/home/categoryIcons";
import { useFoodContext } from "@/app/(home)/category/FoodContext";
import { styles } from "@/components/home/Styles";
import colors from "@/styles/colors";

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
};

const FoodFlatList = ({ data, loading, hasMore, loadMore }: FoodFlatListProps) => {
    const { setSelectedFood } = useFoodContext();
    const router = useRouter();

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

// import { Text, View, Pressable, StyleSheet, FlatList, Image } from "react-native";
// import { useRouter } from 'expo-router';
// import categoryIcons from "@/components/home/categoryIcons";
// import { useFoodContext } from "@/app/(home)/category/FoodContext";
// import { styles } from "@/components/home/Styles";
// import colors from "@/styles/colors";

// const FoodFlatList = ({ data }: { data: any }) => {
//     const { setSelectedFood } = useFoodContext();
//     const router = useRouter();

//     const renderItem = ({ item }: { item: any }) => {
//         if (item.empty) {
//             return <View style={[styles.productItem]} />; // Chỉ giữ spacing
//         }
//         return (
//             <Pressable
//                 style={styles.productItem}
//                 onPress={() => {
//                     setSelectedFood(item);
//                     router.push(`/category/${item.category}/${item.id}`);
//                 }}
//             >
//                 <View style={styles1.imageContainer}>
//                     <Image source={item.image} style={styles.productImage} />
//                     <View style={styles1.iconContainer}>
//                         <Image
//                             source={categoryIcons[item.category as keyof typeof categoryIcons]}
//                             style={styles1.iconImage}
//                         />
//                     </View>
//                 </View>
//                 <Text style={styles.categoryText}>{item.name || 'No Name'}</Text> {/* Đảm bảo bọc trong <Text> */}
//                 <Text style={styles.productPrice}>{item.price || 'N/A'}</Text> {/* Đảm bảo bọc trong <Text> */}
//             </Pressable>
//         );
//     };

//     const formatData = (data: any, numColumns: any) => {
//         const numberOfFullRows = Math.floor(data.length / numColumns);
//         let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

//         if (numberOfElementsLastRow !== 0) {
//             numberOfElementsLastRow = numColumns - numberOfElementsLastRow;
//             data = [...data, ...Array(numberOfElementsLastRow).fill({ empty: true })];
//         }
//         return data;
//     };

//     return (
//         <FlatList
//             data={formatData(data, 2)}
//             numColumns={2}
//             keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//             renderItem={renderItem}
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}
//         />
//     );
// };

// const styles1 = StyleSheet.create({
//     txt: {
//         fontSize: 15,
//         fontFamily: "Spartan_700Bold",
//         color: colors.Orange_Base,
//         textAlign: 'center',
//     },
//     txtContainer: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginBottom: 20
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         overflow: 'hidden',
//     },
//     iconContainer: {
//         position: 'absolute',
//         left: 20,
//         padding: 8,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//     },
//     iconImage: {
//         resizeMode: 'contain',
//     },
//     itemInvisible: {
//         backgroundColor: 'transparent',
//     }
// });

// export default FoodFlatList;