import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { IconButton } from "react-native-paper";
import { router, useFocusEffect } from "expo-router";
import Button from "@/components/home/button";
import { styles as homeStyles } from "@/components/home/Styles";
import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import { useCart } from "@/components/home/cartContext";
import APIs, { authApi, endpoints } from '@/configs/APIs';
import { useAuth } from "@/components/AuthContext";
import { LoadingOverlay } from "@/components/home/LoadingComponents";

const estimateTime = "30-40 mins";

const Payment: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const { selectedItems, setSelectedItems, deliveryFee } = useCart();
    const { access_token } = useAuth();

    const initialTotal = selectedItems.reduce((sum, item) => sum + item.price * item.items, deliveryFee);
    const [total] = useState(initialTotal);

    const [openAddress, setOpenAddress] = useState(false);
    const [address, setAddress] = useState<number | null>(null);

    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<number | null>(null);

    const [addresses, setAddresses] = useState<{ id: number, address: string, name: string }[]>([]);
    const [userPaymentMethods, setUserPaymentMethods] = useState<{
        id: number,
        payment_type: number,
        payment_type_name: string,
        isDefault: boolean
    }[]>([]);

    const [deletedData, setDeletedData] = useState<number[]>([]);

    // const [orderStatus, setOrderStatus] = useState<string>('');
    const [orderInfo, setOrderInfo] = useState<any>();

    const loadAddresses = async () => {
        try {
            setLoading(true);
            let res = await authApi(access_token).get(endpoints.address).finally(() => setLoading(false));
            setAddresses(res.data.map((item: any) => ({ id: item.id, address: item.address, name: item.name })));

        } catch (error) {
            console.log(error);
        }
    };

    const loadPaymentMethods = async () => {
        try {
            setLoading(true);
            let res = await authApi(access_token).get(endpoints.payment_methods).finally(() => setLoading(false));
            setUserPaymentMethods(res.data.map((item: any) => ({
                id: item.id,
                payment_type: item.payment_type,
                payment_type_name: item.payment_type_name,
                isDefault: item.isDefault
            })));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userPaymentMethods.length > 0) {
            const defaultPaymentMethod = userPaymentMethods.find((item) => item.isDefault);
            if (defaultPaymentMethod) {
                setPaymentMethod(defaultPaymentMethod.payment_type);
            }
        }
    }, [userPaymentMethods]);

    useEffect(() => {
        if (addresses.length > 0) {
            setAddress(addresses[0].id);
        }
    }, [addresses]);

    useFocusEffect(
        useCallback(() => {
            loadAddresses();
            loadPaymentMethods();
        }, [])
    );

    const createOrder = async () => {
        try {

            const orderData = {
                "delivery_fee": deliveryFee,
                "dishes": selectedItems.map((item) => ({
                    "dish": item.dish_id,
                    "quantity": item.items,
                    "toppings": item.toppings ? item.toppings.map((topping: any) => ({
                        "id": topping.id,
                        "quantity": topping.quantity
                    })) : []
                })),
                "location": address,
                "payment_type": paymentMethod,
            };

            console.log("Order Data will be created:", orderData)
            setLoading(true);
            let res = await authApi(access_token).post(endpoints['create_order'], orderData).finally(() => setLoading(false));

            console.log('Order created successfully');

            setDeletedData(selectedItems.map((item) => item.id));

            console.log("DHGSHGDJDSJ", res.data);

            setOrderInfo(res.data);



        } catch (error) {
            Alert.alert("Hey Besties", 'Order creation failed');
        }
    };

    const deleteItems = async () => {
        setLoading(true);
        for (let i = 0; i < deletedData.length; i++) {
            try {
                await authApi(access_token).delete(`${endpoints.delete_item}${deletedData[i]}/`);
                setSelectedItems(selectedItems.filter((item) => !deletedData.includes(item.id)));
                console.log('Item deleted successfully');
            } catch (error) {
                console.log(`Failed to delete item with id ${deletedData[i]}`, error);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        deleteItems()
    }, [deletedData]);

    useEffect(() => {
        if (orderInfo) {
            if (orderInfo.order_status === 'not paid') {
                router.replace({
                    pathname: '/payForOrder',
                    params: {
                        orderInfo: JSON.stringify(orderInfo),
                        isNewOrder: "true"
                    }
                })
            } else
                router.replace('/orderConfirmed');
        }
    }, [orderInfo]);


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && <LoadingOverlay></LoadingOverlay>}
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
                                    items={addresses.map((item) => ({ label: item.name, value: item.id }))}
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
                                renderItem={({ item }) => (
                                    <View style={styles.orderRow}>
                                        <Text style={fontStyles.Paragraph}>{item.name}</Text>
                                        <Text style={[fontStyles.Paragraph, {
                                            color: colors.Orange_Base,
                                            paddingRight: 7
                                        }]}>
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
                                    items={userPaymentMethods.map((item) => ({
                                        label: item.payment_type_name,
                                        value: item.payment_type
                                    }))}
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
                    <Button text="Pay Now" onPress={createOrder} buttonColor={colors.Orange_2}
                        textColor={colors.Orange_Base} />
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