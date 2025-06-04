import { FlatList, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { styles } from "@/components/home/Styles";

export default function HomeCategory({ item }) {
    return (
        <FlatList
            data={item.items}
            horizontal // cuộn theo chiều ngang
            keyExtractor={(category) => category.id}
            renderItem={({ item: category }) => (
                <View className='ml-4 flex-col justify-center items-center'>
                    <View className='h-20 rounded-full' style={{ backgroundColor: '#F3E9B5', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable
                            onPress={() => router.navigate(`/category/${category.name}`)} // chuyển đến trang food với category.name
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
}