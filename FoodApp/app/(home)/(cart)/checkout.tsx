import React, {useMemo, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {styles as homeStyles} from "@/components/home/Styles";
import BackButton from "@/components/home/backButton";
import Button from "@/components/home/button";
import {router} from "expo-router";
import colors from "@/styles/colors";
import {Image} from "expo-image";
import fontStyles from "@/styles/fontStyles";
import {IconButton} from "react-native-paper";
import InputField from "@/components/welcome/inputField";
import {styles as inputFieldStyles} from "@/components/welcome/Styles";
import DropDownPicker from "react-native-dropdown-picker";

const deleveryFee = 10.00;
const orders = [
    {
        id: 1,
        name: "Strawberry shake",
        price: 20.00,
        date: "29 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        items: 2,
    },
    {
        id: 2,
        name: "Blackberry shake",
        price: 23.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        items: 3,
    },
    {
        id: 3,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 4,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 5,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 6,
        name: "Strawberry shake",
        price: 20.00,
        date: "29 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        items: 2,
    },
    {
        id: 7,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 8,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 9,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 10,
        name: "Blackberry shake",
        price: 23.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        items: 3,
    },
];

const addresses = [
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Orange', value: 'orange'},
    {label: 'Mango', value: 'mango'},
];

function Checkout() {
    const [orderData, setOrderData] = useState(orders);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState(null);

    const removeItem = (id: number) => {
        setOrderData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const subtotal = useMemo(
        () => orderData.reduce((total, item) => total + item.price * item.items, 0),
        [orderData]
    );

    const handleAdd = (id: number) => {
        setOrderData((prevData) =>
            prevData.map((item) =>
                item.id === id ? {...item, items: item.items + 1} : item
            )
        );
    };

    const handleSubtract = (id: number) => {
        if (orderData.find((item) => item.id === id)?.items === 1)
            removeItem(id);
        else
            setOrderData((prevData) =>
                prevData.map((item) =>
                    item.id === id && item.items > 0 ? {...item, items: item.items - 1} : item
                )
            );
    };

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={"p-5 flex-col"} style={homeStyles.bodyPage}>
                <View className={'w-full mb-5'} style={{flex: 1}}>
                    <Text className={"mb-3"} style={[fontStyles.subtitulo, {fontSize: 20}]}>Shipping Address</Text>
                    <View className={`bg-[${colors.Yellow_2}] rounded-[15] flex-row justify-between items-center`}>
                        <View style={styles.nameFieldItem}>
                            <DropDownPicker
                                style={styles.dropdown}
                                open={open}
                                value={address}
                                items={addresses}
                                setOpen={setOpen}
                                setValue={setAddress}
                                dropDownContainerStyle={{}}
                                placeholder={"Select Address"}
                            />
                        </View>

                        <IconButton icon={"pencil"} iconColor={colors.Orange_Base} size={20} onPress={() => {
                            router.push('/deliveryAddress')
                        }}/>
                    </View>
                </View>

                <View className={"w-full mb-5"} style={{flex: 6}}>
                    <Text className={"mb-5"} style={fontStyles.subtitulo}>Order Summary</Text>
                    <FlatList
                        data={orderData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.orderContainer}>
                                <Image source={item.image} style={styles.image}/>
                                <View style={styles.orderDetailsContainer}>
                                    <Text style={styles.orderTitle}>{item.name}</Text>
                                    <Text style={styles.orderPrice}>${item.price.toFixed(2)}</Text>
                                    <Text style={styles.orderDetails}>{item.date}</Text>
                                    <View style={styles.quantityControls}>
                                        <Pressable style={styles.trackButton}
                                                   onPress={() => handleSubtract(item.id)}>
                                            <Text style={styles.trackButtonText}>-</Text>
                                        </Pressable>
                                        <Text style={styles.orderQuantity}>{item.items} items</Text>
                                        <Pressable style={styles.trackButton} onPress={() => handleAdd(item.id)}>
                                            <Text style={styles.trackButtonText}>+</Text>
                                        </Pressable>

                                        <IconButton className={""} icon={"trash-can"} iconColor={colors.Orange_Base}
                                                    size={20}
                                                    onPress={() => removeItem(item.id)}/>
                                    </View>
                                </View>
                            </View>
                        )}
                    />

                </View>

                <View className={"w-full justify-center"} style={{flex: 1}}>
                    <View className={"flex-row justify-between"}>
                        <Text style={styles.totalText}>Delivery fee:</Text>
                        <Text style={styles.totalText}>${deleveryFee.toFixed(2)}</Text>
                    </View>

                    <View className={"flex-row justify-between"}>
                        <Text style={styles.totalText}>Subtotal:</Text>
                        <Text style={styles.totalText}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View className={"flex-row justify-between"}>
                        <Text style={styles.totalText}>Total:</Text>
                        <Text style={styles.totalText}>${(subtotal + deleveryFee).toFixed(2)}</Text>
                    </View>
                </View>

                <View className={"w-full justify-self-end"} style={{}}>
                    <Button text={"Place Order"} onPress={() => router.push('/payment')} buttonColor={colors.Orange_2}
                            textColor={colors.Orange_Base}></Button>
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    orderContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.Orange_2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    orderDetailsContainer: {
        marginLeft: 20,
        flex: 1,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Font,
    },
    orderPrice: {
        fontSize: 16,
        color: colors.Orange_Base,
    },
    orderDetails: {
        fontSize: 14,
        color: colors.Font,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    trackButton: {
        backgroundColor: colors.Orange_2,
        borderRadius: 20,
    },
    trackButtonText: {
        color: colors.Orange_Base,
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderQuantity: {
        fontSize: 14,
        color: colors.Font,
    },

    totalText: {
        ...fontStyles.Title,
        fontSize: 16,
        color: colors.Font,
    },

    nameFieldItem: {
        flex: 1,
    },
    dropdown: {
        backgroundColor: colors.Yellow_2,
        borderWidth: 0,
        borderRadius: 8,
    },
});


export default Checkout;