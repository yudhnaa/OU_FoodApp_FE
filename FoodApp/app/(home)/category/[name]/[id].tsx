import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import colors from "@/styles/colors";
import { Icon } from "react-native-paper";
import { useFoodContext } from "../FoodContext";
import LoadingComponent from "@/components/home/LoadingComponents";
import { useEffect, useState } from "react";
import APIs, { endpoints } from "@/configs/APIs";
import Toast , {BaseToast} from "react-native-toast-message";


export default function FoodDetailPage() {
    const { selectedFood } = useFoodContext();
    const [quantity, setQuantity] = useState(1);
    const [toppings, setToppings] = useState<any[]>([]);
    const [pressedMinus, setPressedMinus] = useState(false);
    const [pressedPlus, setPressedPlus] = useState(false);

    const loadTopping = async () => {
        try {
            let res = await APIs.get(endpoints["dish_topping"](selectedFood.id));
            const toppingsWithCheckbox = res.data.map((topping : any) => ({
                ...topping,
                quantity: 0,
                selected: false,
            }));
            setToppings(toppingsWithCheckbox);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTopping();
    }, [selectedFood.id]);

    const handleQuantityChange = (type : any) => {
        if (type === "increase") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleToppingSelection = (toppingId : any) => {
        const updatedToppings = toppings.map((topping) =>
            topping.id === toppingId
                ? {
                    ...topping,
                    selected: !topping.selected,
                    quantity: !topping.selected ? 1 : 0, // Nếu chọn, đặt số lượng là 1; nếu bỏ chọn, reset về 0
                }
                : topping
        );
        setToppings(updatedToppings);
    };

    const handleToppingQuantityChange = (toppingId : any, type : any) => {
        const updatedToppings = toppings.map((topping) =>
            topping.id === toppingId && topping.selected
                ? {
                    ...topping,
                    quantity: type === "increase" ? topping.quantity + 1 : Math.max(0, topping.quantity - 1),
                }
                : topping
        );
        setToppings(updatedToppings);
    };

    const toastConfig = {
        success: (props : any) => (
            <BaseToast
                {...props}
                style={styles.successToast}
                text1Style={styles.toastText1}
                text2Style={styles.toastText2}
            />
        ),
        error: (props : any) => (
            <BaseToast
                {...props}
                style={styles.errorToast}
                text1Style={styles.toastText1}
                text2Style={styles.toastText2}
            />
        ),
    };

    const addToCart = async () => {
        try {
            const selectedToppings = toppings
                .filter((topping) => topping.selected)
                .map((topping) => ({
                    topping_id: topping.id,
                    quantity: topping.quantity,
                }));

            const payload = {
                dish_id: selectedFood.id,
                quantity,
                toppings: selectedToppings,
            };

            let res = await APIs.post(endpoints["add-to-cart"], payload);


            if (res.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Added to cart successfully 👌',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to add to cart. Please try again.',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!selectedFood) {
        return <LoadingComponent />;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={selectedFood.image} style={styles.image} />
            </View>

            <View style={styles.content}>
                <View style={styles.priceQuantityContainer}>
                    <Text style={styles.price}>{selectedFood.price}</Text>
                    <View style={styles.quantityControl}>
                        <Pressable
                            style={[styles.quantityButton,pressedMinus && styles.quantityButtonPressed]}
                            onPress={() => handleQuantityChange("decrease")}
                            onPressIn={() => setPressedMinus(true)}
                            onPressOut={() => setPressedMinus(false)}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <Pressable
                            style={[styles.quantityButton,pressedPlus && styles.quantityButtonPressed]}
                            onPress={() => handleQuantityChange("increase")}
                            onPressIn={() => setPressedPlus(true)}
                            onPressOut={() => setPressedPlus(false)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>
                    </View>
                </View>
                
                <Text style={styles.description}>{selectedFood.description}</Text>

                <View style={{ borderWidth: 2,borderColor : colors.Orange_Base, borderRadius: 8, padding: 5,backgroundColor : colors.Orange_2 }} className={'flex-row justify-between items-center'}>
                     <View className={'flex-row justify-between items-center w-[72%] pb-2'}>
                         <View className={'w-[75%]'}>
                             <Text style={styles.toppingsTitle}>Shop : Shop Name</Text>
                             <Text style={styles.description}>Address : Nguyen Binh</Text>
                             <Text style={styles.description}>Distance : 15km</Text>
                         </View>

                         <View>
                             <Pressable style={styles.chatButton}>
                                 <Icon size={28} source={'chat-outline'} color={colors.Font_2}/>
                             </Pressable>
                         </View>
                     </View>

                     <View className={'pb-2'}>
                         <Pressable style={styles.followButton}>
                             <Text style={styles.followButtonTxt}>Follow</Text>
                         </Pressable>
                     </View>
                 </View>

                <Text style={styles.toppingsTitle}>Toppings</Text>
                {toppings.map((topping) => (
                    <View key={topping.id.toString()} style={styles.toppingItem}>
                        <Pressable onPress={() => handleToppingSelection(topping.id)}>
                            <Icon
                                source={topping.selected ? "checkbox-marked-circle" : "checkbox-marked-circle-outline"}
                                size={24}
                                color={topping.selected ? colors.Orange_Base : "#ccc"}
                            />
                        </Pressable>
                        <Text style={styles.toppingName}>{topping.name}</Text>
                        <Text style={styles.toppingPrice}>{topping.price.toFixed(2)}</Text>
                        <View style={styles.toppingControls}>
                            <Pressable
                                style={[
                                    styles.quantityButton,
                                ]}
                                onPress={() => handleToppingQuantityChange(topping.id, "decrease")}

                                disabled={!topping.selected}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </Pressable>
                            <Text style={styles.quantityText}>{topping.quantity}</Text>
                            <Pressable
                                style={[
                                    styles.quantityButton,
                                ]}
                                onPress={() => handleToppingQuantityChange(topping.id, "increase")}
                                disabled={!topping.selected}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}

                <Toast config={toastConfig} position="top"/>

                <Pressable style={styles.addButton} onPress={addToCart}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Font_2,
    },
    imageContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    image: {
        width: "90%",
        height: 300,
        borderRadius: 20,
    },
        content: {
        padding: 20,
        gap: 16,
    },
    priceQuantityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: 28,
        color: colors.Orange_Base,
        fontFamily: 'Spartan_700Bold',
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFE9B5',
        justifyContent: "center",
        alignItems: "center",
    },
    quantityButtonText: {
        fontSize: 20,
        fontFamily: 'Spartan_700Bold',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
        fontFamily: 'Spartan_700Bold',
    },
    quantityButtonPressed: {
        backgroundColor: colors.Orange_Base,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        fontFamily: 'Spartan_400Regular',
    },
    toppingsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    toppingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    toppingName: {
        fontSize: 16,
        fontFamily: 'Spartan_400Regular',
    },
    toppingControls: {
        flexDirection: "row",
        alignItems: "center",
    },
    toppingPrice: {
        fontSize: 16,
        color: colors.Orange_Base,
        fontFamily: 'Spartan_400Regular',
    },
    addButton: {
        backgroundColor: colors.Orange_Base,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    addButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
        followButton: {
        backgroundColor: colors.Orange_Base,
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followButtonTxt: {
        fontFamily : 'Spartan_500Medium',
        fontSize : 16,
        color : colors.Font_2
    },
    chatButton : {
        backgroundColor : colors.Orange_Base,
        padding : 6,
        borderRadius : 50,
        justifyContent : 'center',
        alignItems : 'center'
    },
    successToast: {
        borderLeftColor: "green",
        backgroundColor: "#e0ffe0",
    },
    errorToast: {
        borderLeftColor: "red",
        backgroundColor: "#ffe0e0",
    },
    toastText1: {
        fontSize: 16, // Chữ lớn hơn cho tiêu đề
        color: "#333",
        fontFamily : 'Spartan_700Bold',
    },
    toastText2: {
        fontSize: 16, // Chữ lớn hơn cho nội dung
        color: "#666",
        fontFamily : 'Spartan_700Bold',
    },
});
