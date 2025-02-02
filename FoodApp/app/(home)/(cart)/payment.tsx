import React, {useState,useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {IconButton} from "react-native-paper";
import {router} from "expo-router";
import Button from "@/components/home/button";
import {styles as homeStyles} from "@/components/home/Styles";
import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import {useCart} from "@/components/home/cartContext";
import APIs,{endpoints} from '@/configs/APIs';

// const addresses = [
//     {label: 'Address 1', value: 'address1'},
//     {label: 'Address 2', value: 'address2'},
//     {label: 'Address 3', value: 'address3'},
// ];

// const paymentMethods = [
//     {label: 'Paypal', value: 'paypal'},
//     {label: 'Visa', value: 'visa'},
//     {label: 'MasterCard', value: 'mastercard'},
// ];

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
    {
        id: 11,
        name: "Strawberry shake",
        price: 20.00,
        date: "29 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        items: 2,
    },
    {
        id: 12,
        name: "Blackberry shake",
        price: 23.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        items: 3,
    },
    {
        id: 13,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 14,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 15,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 16,
        name: "Strawberry shake",
        price: 20.00,
        date: "29 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        items: 2,
    },
    {
        id: 17,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 18,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 19,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 20,
        name: "Blackberry shake",
        price: 23.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        items: 3,
    },
    {
        id: 21,
        name: "Strawberry shake",
        price: 20.00,
        date: "29 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_1.png'),
        items: 2,
    },
    {
        id: 22,
        name: "Blackberry shake",
        price: 23.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_2.png'),
        items: 3,
    },
    {
        id: 23,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 24,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
    {
        id: 25,
        name: "Mango shake",
        price: 25.00,
        date: "30 Nov, 01:20 pm",
        image: require('@/assets/images/bestSeller_pic/pic_3.png'),
        items: 4,
    },
];

// {
//     "payment_type": 1,
//     "order_status": 1,
//     "delivery_fee": 10,
//     "location": 1,
//     "dishes": [
//         {
//             "dish": 5,
//             "quantity": 2,
//             "toppings": [
//                 {"id": 1, "quantity": 1},
//                 {"id": 2, "quantity": 2}
//             ]
//         },
//         {
//             "dish": 4,
//             "quantity": 1,
//             "toppings": []
//         }
//     ]
// }

const deliveryFee = 10.00;
const estimateTime = "30-40 mins";

const Payment: React.FC = () => {

    const {selectedItems} = useCart();

    const initialTotal = selectedItems.reduce((sum, item) => sum + item.price * item.items, deliveryFee);
    const [total] = useState(initialTotal);

    const [openAddress, setOpenAddress] = useState(false);
    const [address, setAddress] = useState<number | null>(null);

    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<number | null>(null);

    const [addresses, setAddresses] = useState([]);
    const [userPaymentMethods, setPaymentMethods] = useState([]);

    const [deletedData, setDeletedData] = useState<number[]>([]);

    const loadAddresses = async () => {
        try{
            let res = await APIs.get(endpoints['location']);
            setAddresses(res.data.map((item: any) => ({label: item.address, value: item.id})));
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        let ids = selectedItems.map((item) => item.id);
        setDeletedData(prev => {
            console.log("Previous deletedData:", prev);
            console.log("New deletedData:", ids);
            return ids;
        });
    },[selectedItems])


    useEffect(() => {
        loadAddresses();
    },[]);

    const loadPaymentMethods = async () => {
        try{
            let res = await APIs.get(endpoints['user_payment']);
            setPaymentMethods(res.data.map((item: any) => ({label: item.payment_type_name, value: item.payment_type})));
        }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        loadPaymentMethods();
    },[]);

    

    const creatOrder = async () => {
        try{
            const orderData = {
                "payment_type": paymentMethod,
                "order_status": "active",
                "delivery_fee": 10,
                "location" : address,
                "dishes": selectedItems.map((item) => ({
                    "dish": item.dish_id,
                    "quantity": item.items,
                    "toppings": item.toppings ? item.toppings.map((topping: any) => ({
                        "id": topping.id,
                        "quantity": topping.quantity
                    })) : []
                }))
            }

            let res = await APIs.post(endpoints['create_order'], orderData);
            if(res.status === 201){
                for (let i = 0; i < deletedData.length; i++){
                    await APIs.delete(endpoints['delete_item'](deletedData[i]));

                    
                }
                console.log('Order created successfully')
            }
            else{
                console.log('Order creation failed')
            }
            console.log(res.data)
        }
        catch(error){
            console.log(error)
        }
    }

    // const handlePayment = () => {
    //     console.log(paymentMethod, address);
    //     creatOrder();
    //     router.dismissAll()
    //     router.replace('/(cart)/orderConfirmed')
    // };

    

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={"p-5 flex-col"} style={homeStyles.bodyPage}>
                <View style={styles.body}>
                    {/* Shipping Address */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Shipping Address</Text>
                        <View style={styles.dropdownContainer}>
                            <View style={styles.flex1}>
                                <DropDownPicker
                                    style={styles.dropdown}
                                    open={openAddress}
                                    value={address}
                                    items={addresses}
                                    setOpen={setOpenAddress}
                                    setValue={setAddress}
                                    placeholder="Select Address"
                                />
                            </View>
                            <IconButton
                                icon="pencil"
                                iconColor={colors.Orange_Base}
                                size={20}
                                onPress={() => router.push('/deliveryAddress')}
                            />
                        </View>
                    </View>

                    {/* Order Summary */}
                    <View style={[styles.section, styles.flex4]}>
                        <Text style={styles.header}>Order Summary</Text>
                        <View className={"flex-1 flex-row"}>
                            <FlatList
                                data={selectedItems}
                                keyExtractor={(item) => item.id.toString()}
                                ListEmptyComponent={<Text style={fontStyles.Paragraph}>No orders available</Text>}
                                renderItem={({item}) => (
                                    <View style={styles.orderRow}>
                                        <Text style={fontStyles.Paragraph}>{item.name}</Text>
                                        <Text style={[fontStyles.Paragraph, {color: colors.Orange_Base, paddingRight: 7}]}>
                                            {item.items} items
                                        </Text>
                                    </View>
                                )}
                            />
                            <View style={styles.totalContainer}>
                                <Text style={[fontStyles.Title, styles.totalText]}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Payment Method */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Payment Method</Text>
                        <View style={styles.dropdownContainer}>
                            <View style={styles.flex1}>
                                <DropDownPicker
                                    style={styles.dropdown}
                                    open={openPaymentMethod}
                                    value={paymentMethod}
                                    items={userPaymentMethods}
                                    setOpen={setOpenPaymentMethod}
                                    setValue={setPaymentMethod}
                                    placeholder="Select Payment Method"
                                />
                            </View>
                            <IconButton
                                icon="pencil"
                                iconColor={colors.Orange_Base}
                                size={20}
                                onPress={() => router.push('/paymentMethods')}
                            />
                        </View>
                    </View>

                    {/* Delivery Time */}
                    <View style={styles.section}>
                        <Text style={styles.header}>Delivery Time</Text>
                        <View style={styles.deliveryRow}>
                            <Text style={fontStyles.Paragraph}>Estimated Delivery</Text>
                            <Text style={fontStyles.Paragraph}>{estimateTime}</Text>
                        </View>
                    </View>

                    {/* Pay Now Button */}
                    <Button text="Pay Now" onPress={() => {
                        console.log(paymentMethod, address);
                        creatOrder();
                        router.dismissAll();
                        router.replace('/(cart)/orderConfirmed');
                    }} buttonColor={colors.Orange_2} textColor={colors.Orange_Base}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    body: {
        flex: 1,
    },
    section: {
        marginBottom: 15,
    },
    header: {
        // fontSize: 20,
        marginBottom: 10,
        ...fontStyles.subtitulo,
    },
    dropdownContainer: {
        backgroundColor: colors.Yellow_2,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    dropdown: {
        backgroundColor: colors.Yellow_2,
        borderWidth: 0,
        borderRadius: 8,
    },
    flex1: {
        flex: 1,
    },
    flex4: {
        flex: 4,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15
    },
    totalText: {
        fontSize: 20,
    },
    deliveryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Payment;
