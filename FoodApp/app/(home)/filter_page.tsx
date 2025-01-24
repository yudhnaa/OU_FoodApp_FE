import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {router} from 'expo-router';
import {styles} from '@/components/home/Styles';
import APIs,{endpoints} from '@/configs/APIs';
import { useEffect,useState,useCallback } from 'react';
import { Icon } from 'react-native-paper';
import categoryIcons from '@/components/home/categoryIcons';
import colors from '@/styles/colors';
import PriceSlider from '@/components/home/priceSlider';

import { Rating } from '@kolking/react-native-rating';

type Category = {
    id: string;
    name: string;
    icon: { uri: string };
}


export default function FilterPage() {
    const [categories, setCategories] = useState([]);
    const [focusedCategory, setFocusedCategory] = useState<string | null>("Snacks");
    const [rating, setRating] = useState(0);

    const handleChange = useCallback(
        (value: number) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );

    const loadCategories = async () => {
        try{
            const res = await APIs.get(endpoints['dish_type']);

            const mappedData = res.data.map((item: any) => ({
                id : item.id,
                name : item.name,
                icon : { uri : item.image || 'https://placehold.co/150'}
            }));

            setCategories(mappedData);
        }
        catch(error){
            console.log('Error loading categories', error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <View style={styles.backGround}>
            <View style={[styles.bodyPage,{padding : 10}]}>
                <View style={{height : 170}}>
                    <Text style={styles1.txt}>Categories</Text>
                    <FlatList
                            data={categories}
                            horizontal // cuộn theo chiều ngang
                            keyExtractor={(category) => category.id}
                            renderItem={({ item }) => (
                                <View className='ml-4 flex-col justify-center items-center'>
                                    <View className='h-20 rounded-full' style={[styles1.pressableBackground, focusedCategory === item.name ? {backgroundColor: '#F5CB58'} : {backgroundColor: '#F3E9B5'}]}>
                                        <Pressable
                                            onPress={() => {
                                                setFocusedCategory(item.name);
                                                setRating(0);
                                            }} // chuyển đến trang food với category.name
                                            style={[styles.categoryItem]}
                                        >
                                            <Image source={item.icon}
                                                style={styles.categoryIcon}
                                                resizeMode="contain"
                                            />
                                        </Pressable>
                                    </View>
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ paddingVertical: 5 }} 
                        />
                        <View style={styles1.separateLine}></View>                       
                </View>

                <View className='flex-col'>
                    <Text style={styles1.txt}>Sort by</Text>
                    <View className='flex-row mr-5 mt-5 items-center'>
                        <Text className='mr-5' style = {{fontFamily : 'Spartan_500Medium'}}>Top rated</Text>
                        <Rating
                            size={25}
                            rating={rating}
                            onChange={handleChange}
                            variant={"stars-outline"}
                        />
                    </View>
                    <View style={styles1.separateLine}></View>  
                </View>

                
                <View>
                    <Text>This is categories for {focusedCategory}</Text>
                    <View style={styles1.separateLine}></View>
                </View> 
                

                <View>
                    <PriceSlider/>
                </View>

                <View style={styles1.addButtonContainer}>
                    <Pressable style={styles1.addButton}>
                        <Text style={styles1.addButtonText}>Apply</Text>
                    </Pressable>
                </View>
                    
            </View>
        </View>
    );
}

const styles1 = StyleSheet.create({
    separateLine: {
        borderBottomColor: colors.Orange_Base,
        borderBottomWidth: 1,
        // marginHorizontal: 10,
        marginVertical: 10,
        marginBottom : 15,
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
    txt : {
        fontSize: 18,
        fontFamily : 'Spartan_500Medium',
    },
    pressableBackground : {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});