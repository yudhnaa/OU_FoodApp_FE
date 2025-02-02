import React, { useState, useEffect, useMemo } from 'react';
import { Modal, StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import fontStyles from '@/styles/fontStyles';
import colors from '@/styles/colors';
import Button from '@/components/home/button';
import {router} from "expo-router";
import {IconButton,Icon} from "react-native-paper";
import APIs,{endpoints} from '@/configs/APIs';
import { useCart } from '@/components/home/cartContext';


type CartProps = {
    visible: boolean;
    onCancel: () => void;
}

// const orders = [
//     {
//         id: 1,
//         name: "Strawberry shake",
//         price: 20.00,
//         date: "29 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
//         items: 2,
//     },
//     {
//         id: 2,
//         name: "Blackberry shake",
//         price: 23.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
//         items: 3,
//     },
//     {
//         id: 3,
//         name: "Mango shake",
//         price: 25.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         items: 4,
//     },
//     {
//         id: 4,
//         name: "Mango shake",
//         price: 25.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         items: 4,
//     },
//     {
//         id: 5,
//         name: "Mango shake",
//         price: 25.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         items: 4,
//     },
//     {
//         id: 6,
//         name: "Strawberry shake",
//         price: 20.00,
//         date: "29 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_1.png'),
//         items: 2,
//     },
//     {
//         id: 7,
//         name: "Mango shake",
//         price: 25.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         items: 4,
//     },
//     {
//         id: 8,
//         name: "Mango shake",
//         price: 25.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         items: 4,
//     },
//     {
//         id: 9,
//         name: "Mango shake",
//         price: 25.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_3.png'),
//         items: 4,
//     },
//     {
//         id: 10,
//         name: "Blackberry shake",
//         price: 23.00,
//         date: "30 Nov, 01:20 pm",
//         image: require('@/assets/images/bestSeller_pic/pic_2.png'),
//         items: 3,
//     },
// ];

// const deleveryFee = 10.00;

const Cart: React.FC<CartProps> = ({ visible, onCancel }) => {
    const [orderData, setOrderData] = useState([]);
    const { selectedItems, setSelectedItems } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const deleveryFee = selectedItems.length > 0 ? 10.00 : 0;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await APIs.get(endpoints['cart_items']);
                setOrderData(response.data);
                const formattedData = response.data.map((item: any) => ({
                        id: item.id,
                        dish_id : item.dish_id,
                        name: item.dish_name,
                        price: item.total_price,
                        dish_price : item.dish_price,
                        date: new Date(item.date).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short", // Nov
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        }),
                        image: { uri: item.image },
                        items: item.quantity,
                        selected: false,
                        toppings: item.toppings.map((topping: any) => ({
                            id: topping.topping.id,
                            name: topping.topping.name,
                            price: topping.topping.price,
                            quantity: topping.quantity
                        }))
                }));
                setOrderData(formattedData);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[]);

    const removeItem = (id: number) => {
        setOrderData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const toggleSelectItem = (id: number) => {
        setOrderData((prevData : any) =>
          prevData.map((item : any) =>
            item.id === id ? { ...item, selected: !item.selected } : item
          )
        );
    
        setSelectedItems((prevSelected : any) => {
          const isSelected = prevSelected.find((item: any) => item.id === id);
    
          if (isSelected) {
            return prevSelected.filter((item: any) => item.id !== id);
          } else {
            const selectedItem = orderData.find((item) => item.id === id);
            return [...prevSelected, selectedItem];
          }
        });
      };

    // Tính lại tổng tiền
    useEffect(() => {
        const newSubtotal = selectedItems.reduce((total, item) => total + item.price * item.items, 0);
        setSubtotal(newSubtotal);
    }, [selectedItems]);

    // const subtotal = useMemo(
    //     () => orderData.reduce((total, item) => total + item.price * item.items, 0),
    //     [orderData]
    // );

    const handleAdd = (id: number) => {
        setOrderData((prevData: any) =>
            prevData.map((item: any) =>
                item.id === id ? { ...item, items: item.items + 1 } : item
            )
        );
    
        setSelectedItems((prevSelected: any) =>
            prevSelected.map((item: any) =>
                item.id === id ? { ...item, items: item.items + 1 } : item
            )
        );
    };

    const handleSubtract = (id: number) => {
        if (orderData.find((item : any) => item.id === id)?.items === 1)
            removeItem(id);
        else
        setOrderData((prevData: any) =>
            prevData.map((item: any) =>
                item.id === id && item.items > 0 ? { ...item, items: item.items - 1 } : item
            )
        );

        setSelectedItems((prevSelected: any) =>
            prevSelected.map((item: any) =>
                item.id === id && item.items > 0 ? { ...item, items: item.items - 1 } : item
            )
        );
    };

    const handleGesture = (event: any) => {
        const { translationX } = event.nativeEvent;
        if (translationX > 100) {
            onCancel();
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PanGestureHandler onGestureEvent={handleGesture}>
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Image
                                    source={require('@/assets/images/icons/ico_cart.svg')}
                                    style={styles.cartIcon}
                                    contentFit="contain"
                                />
                                <Text style={[fontStyles.Title, styles.headerTitle]}>Cart</Text>
                            </View>

                            {/* Order Summary */}
                            <Text style={[styles.totalText, styles.orderSummary]}>
                                {orderData.length > 0
                                    ? `You have ${orderData.length} items in your cart`
                                    : 'Your cart is empty'}
                            </Text>

                            {/* Orders List */}
                            <FlatList
                                data={orderData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.orderContainer}>
                                        <IconButton
                                            icon={item.selected ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                            size={23}
                                            iconColor={colors.Font_2}
                                            onPress={() => toggleSelectItem(item.id)}
                                        />
                                        <Image source={item.image} style={styles.image} />
                                        <View style={styles.orderDetailsContainer}>
                                            <Text style={styles.orderTitle}>{item.name}</Text>
                                            <Text style={styles.orderPrice}>${item.price.toFixed(2)}</Text>
                                            <Text style={styles.orderDetails}>{item.date}</Text>
                                            <View style={styles.quantityControls}>
                                                <Pressable style={styles.trackButton} onPress={() => handleSubtract(item.id)}>
                                                    <Text style={styles.trackButtonText}>-</Text>
                                                </Pressable>
                                                <Text style={styles.orderQuantity}>{item.items} items</Text>
                                                <Pressable style={styles.trackButton} onPress={() => handleAdd(item.id)}>
                                                    <Text style={styles.trackButtonText}>+</Text>
                                                </Pressable>
                                                <IconButton className={""} icon={"trash-can"} iconColor={colors.Orange_2} size={20}
                                                            onPress={()=> removeItem(item.id)}/>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />

                            {/* Total Calculation */}
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Delivery fee: ${deleveryFee}</Text>
                                <Text style={styles.totalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
                                <Text style={styles.totalText}>Total: ${(subtotal + deleveryFee).toFixed(2)}</Text>
                            </View>

                            {/* Checkout Button */}
                            <Button
                                text="Check out"
                                onPress={()=>{
                                    if (orderData.length > 0) {
                                        router.push("/checkout")
                                        onCancel();
                                        // console.log(JSON.stringify(selectedItems));
                                    }
                                    else
                                        alert("Your cart is empty")
                                }}
                                buttonColor={colors.Yellow_Base}
                                textColor={colors.Orange_Base}
                            />
                        </View>
                    </View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'flex-end',
    },
    modalContainer: {
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: colors.Orange_Base,
        width: '80%',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: 20,
        marginTop: 30,
    },
    cartIcon: {
        width: 40,
        height: 40,
    },
    headerTitle: {
        paddingLeft: 10,
        color: colors.Font_2,
    },
    orderSummary: {
        marginVertical: 10,
        fontSize: 15,
    },
    orderContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.Orange_2,
        paddingBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    orderDetailsContainer: {
        marginLeft: 6,
        flex: 1,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Font_2,
    },
    orderPrice: {
        fontSize: 16,
        color: colors.Font_2,
        marginBottom: 5,
    },
    orderDetails: {
        fontSize: 14,
        color: colors.Font_2,
        marginBottom: 10,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trackButton: {
        backgroundColor: colors.Orange_2,
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 5,
    },
    trackButtonText: {
        color: colors.Orange_Base,
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderQuantity: {
        fontSize: 14,
        color: colors.Font_2,
    },
    totalContainer: {
        marginVertical: 20,
    },
    totalText: {
        ...fontStyles.subtitulo,
        fontSize: 16,
        color: colors.Font_2,
        marginVertical: 2,
    },
});

export default Cart;

