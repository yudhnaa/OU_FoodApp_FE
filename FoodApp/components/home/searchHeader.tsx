import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Cart from "@/app/(home)/(cart)/cart";


/**
 * Thanh search header : dùng để tìm kiếm món ăn
 * showBackButton : hiện nút back nếu true
 */
type SearchHeaderProps = {
    showBackButton?: boolean;
};

export default function SearchHeader({ showBackButton = false }: SearchHeaderProps) {
    const router = useRouter();
    const [showCart, setShowCart] = React.useState(false);

    return (
        <View className="flex-1 flex-row items-center mt-2">
            <View className='flex-row items-center justify-between w-[65%] h-10 rounded-full bg-white'>
                <TextInput
                    // nếu showBackButton = true thì width = 55% còn không thì width = 65%
                    className={`bg-white rounded-full h-10 px-3 text-base ${showBackButton ? 'w-[50%]' : 'w-[55%]'}`}
                    placeholder="Search"
                    style={{ fontSize: 13 }}
                />
                <View className="ml-2 mr-2 flex-row items-center rounded-full justify-center" style={styles.iconStyle}>
                    <Pressable onPress={() => router.push("/(home)/filter_page")}>
                        <Image
                            source={require('@/assets/images/icons/filter.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </Pressable>
                </View>
            </View>
            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={()=>setShowCart(true)}>
                    <Icon
                        source="cart-outline"
                        color={"#E95322"}
                        size={28}
                    />
                </Pressable>

                {showCart && (
                    <Cart visible={showCart} onCancel={()=>setShowCart(false)}/>

                ) }

            </View>
            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={()=>router.push('/notifications')}>
                    <Icon
                        source="bell-outline"
                        color={"#E95322"}
                        size={28}
                    />
                </Pressable>
            </View>
            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={() => router.push("/profile")}>
                    <Icon
                        source="account-outline"
                        color={"#E95322"}
                        size={28}
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        backgroundColor: "white",
        borderRadius: 12
    },
    filter_button: {
        backgroundColor: '#E95322',
        borderRadius: 18,
        padding: 3
    },
})