import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, Pressable,StyleSheet,TouchableOpacity } from "react-native";
import colors from "@/styles/colors";
import { useFoodContext } from "../FoodContext";
import LoadingComponent from "@/components/home/LoadingComponents";
import { Icon } from "react-native-paper";
import { useState } from "react";

export default function FoodDetailPage() {
    const { selectedFood } = useFoodContext();
    const [selectedTopping, setSelectedTopping] = useState('');

    const [quantity, setQuantity] = useState(1);
    const [pressedMinus, setPressedMinus] = useState(false);
    const [pressedPlus, setPressedPlus] = useState(false);

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };


    const toppings = [
        { id: 1, name: 'Guacamole', price: 2.99 },
        { id: 2, name: 'Jalapeños', price: 3.99 },
        { id: 3, name: 'Ground Beef', price: 3.99 },
        { id: 4, name: 'Pico de Gallo', price: 2.99 },
    ];

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
                    <Text style={styles.price}>${selectedFood.price}</Text>
                    <View style={styles.quantityControl}>
                        <Pressable 
                            style={[
                                styles.quantityButton,
                                pressedMinus && styles.quantityButtonPressed
                            ]}
                            onPressIn={() => setPressedMinus(true)}
                            onPressOut={() => setPressedMinus(false)}
                            onPress={() => handleQuantityChange('decrease')}
                        >
                            <Icon 
                                source="minus" 
                                size={20} 
                                color={pressedMinus ? 'white' : colors.Orange_Base} 
                            />
                        </Pressable>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <Pressable 
                            style={[
                                styles.quantityButton,
                                pressedPlus && styles.quantityButtonPressed
                            ]}
                            onPressIn={() => setPressedPlus(true)}
                            onPressOut={() => setPressedPlus(false)}
                            onPress={() => handleQuantityChange('increase')}
                        >
                            <Icon 
                                source="plus" 
                                size={20} 
                                color={pressedPlus ? 'white' : colors.Orange_Base} 
                            />
                        </Pressable>
                    </View>
                </View>

                <Text style={styles.description}>{selectedFood.description}</Text>

                <Text style={styles.toppingsTitle}>Toppings</Text>
                {toppings.map((topping) => (
                <Pressable 
                    key={topping.id} 
                    style={styles.toppingItem}
                    onPress={() => setSelectedTopping(topping.id.toString())}
                >
                    <Text style={styles.toppingName}>{topping.name}</Text>
                    <View style={styles.toppingLeft}>
                    <Text style={styles.toppingPrice}>${topping.price.toFixed(2)}</Text>
                        <Icon 
                            source={selectedTopping === topping.id.toString() ? "radiobox-marked" : "radiobox-blank"} 
                            size={24} 
                            color={colors.Orange_Base}
                        />
                    </View>
                </Pressable>
            ))}
                
                <View style={styles.addButtonContainer}>
                    <Pressable style={styles.addButton}>
                        <Image source={require('@/assets/images/icons/order_1.png')} />
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Font_2,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    title: {
        fontSize: 25,
        fontFamily:'Spartan_700Bold',
    },
    rating: {
        color: colors.Orange_Base,
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: {
        width: '90%',
        height: 300,
        borderRadius: 20,
    },
    content: {
        padding: 20,
        gap: 16,
    },
    priceQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 28,
        // fontWeight: 'bold',
        color: colors.Orange_Base,
        fontFamily:'Spartan_700Bold',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFE9B5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonPressed: {
        backgroundColor: colors.Orange_Base,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily:'Spartan_700Bold',
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        fontFamily:'Spartan_400Regular',
    },
    toppingsTitle: {
        fontSize: 20,
        marginTop: 10,
        fontFamily:'Spartan_700Bold',
    },
    toppingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,  // Tăng padding để dễ nhấn hơn
    },
    toppingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    toppingName: {
        fontSize: 16,
        fontFamily:'Spartan_400Regular',
    },
    toppingPrice: {
        fontSize: 16,
        color: colors.Orange_Base,
        fontFamily:'Spartan_400Regular',
    },
    addButtonContainer:{
        alignItems:'center',
    },
    addButton: {
        width:"70%",
        flexDirection: 'row',
        backgroundColor: colors.Orange_Base,
        padding: 12,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        fontFamily:'Spartan_700Bold',
    },
});