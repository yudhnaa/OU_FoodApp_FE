import React from 'react';
import {Stack} from 'expo-router';
import {Icon} from 'react-native-paper';
import {View, Text, Pressable} from 'react-native';
import {router} from 'expo-router';
import SearchHeader from '@/components/home/searchHeader';
import FoodProvider from './FoodContext';
import {useFoodContext} from './FoodContext';
import {Image, StyleSheet} from 'react-native';
import {styles} from "@/components/home/Styles";
import fontStyles from "@/styles/fontStyles";
import BackButton from "@/components/home/backButton";


function FoodDetailHeader() {
    const {selectedFood} = useFoodContext();

    return (
        <View style={styles1.container}>
            <View style={styles1.nameContainer}>
                <Text style={styles1.nameText}>{selectedFood?.name || 'Food Detail'}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>5.0</Text>
                    <Icon source="star" size={16} color="#F3E9B5"/>
                </View>
            </View>
            <Pressable>
                <Image source={require("@/assets/images/icons/favorite.png")}/>
            </Pressable>
        </View>
    );
}


export default function StackLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor: '#F5CB58'},
            headerShown: true,
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="[name]"
                          options={{
                              headerTitle: () => <SearchHeader showBackButton={true}/>,
                              headerLeft: () => <BackButton/>

                          }}
            />
            <Stack.Screen name="[name]/[id]" options={{
                headerShown: true,
                headerLeft: () => (<BackButton/>),
                headerTitle: () => (
                    <FoodDetailHeader/>
                )

            }}/>
        </Stack>
    );
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        fontFamily: 'Spartan_700Bold',
        fontSize: 17,
    }
});
