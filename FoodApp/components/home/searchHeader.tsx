import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
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
            {showBackButton && (
                <Pressable
                    onPress={() => {
                        try {
                            router.back()
                        } catch (error) {
                            router.navigate("/(tabs)/home")
                        }
                    }}
                    className="mr-2"
                >
                    <Icon
                        source="chevron-left"
                        color={"#E95322"}
                        size={28}
                    />
                </Pressable>
            )}
            <TextInput
                // nếu showBackButton = true thì width = 55% còn không thì width = 65%
                className={`bg-white rounded-full h-10 px-3 text-base ${showBackButton ? 'w-[55%]' : 'w-[65%]'}`}
                placeholder="Search"
                style={{ fontSize: 12 }}
            />
            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={()=>setShowCart(true)}>
                    <Icon
                        source="cart-outline"
                        color={"#E95322"}
                        size={28}
                    />
                </Pressable>

                {showCart && (
                    <Cart visible={showCart} onCheckout={()=>{}} onCancel={()=>setShowCart(false)}/>

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
    }
})