import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, TextInput, Pressable, StyleSheet, Image, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Cart from '@/app/(home)/(cart)/cart';
import { useSearch } from '@/components/context/SearchContext';

interface SearchFilters {
    store_keyword?: string;
    dish_keyword?: string;
    min_price?: number;
    max_price?: number;
    food_type?: number;
    store_id?: number;
}

interface DishResult {
    id: number;
    name: string;
    price: number;
    image: string;
    food_type_id: number;
    store_id: number;
    description: string;
}

interface StoreResult {
    id: number;
    store_name: string;
    avatar: string;
    address: string;
}

type SearchHeaderProps = {
    showBackButton?: boolean;
};

export default function SearchHeader({ showBackButton = false }: SearchHeaderProps) {
    const router = useRouter();
    const [showCart, setShowCart] = React.useState(false);

    return (
        <View
            className="flex-1 flex-row items-center mt-2"
            style={{ zIndex: 999, elevation: 10, position: "relative" }}
        >
            <View
                className="flex-row items-center justify-between w-[65%] h-10 rounded-full bg-white"
                style={{ position: "relative" }}
            >
                <TextInput
                    className={`bg-white rounded-full h-10 px-3 text-base ${showBackButton ? 'w-[50%]' : 'w-[55%]'}`}
                    placeholder="Search"
                    style={{ fontSize: 13 }}
                    value={searchText}
                    onChangeText={handleSearch}
                    onFocus={() => setShowResults(true)}
                />

                {showResults && (
                    <View style={styles.searchResults}>
                        {Object.entries(filters).length > 0 && (
                            <View style={styles.filterChips}>
                                {Object.entries(filters).map(([key, value]) => (
                                    <View key={key} style={styles.filterChip}>
                                        <Text style={styles.filterChipText}>
                                            {`${key}: ${value}`}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const updatedFilters = { ...filters };
                                                delete updatedFilters[key as keyof SearchFilters];
                                                setFilters(updatedFilters);
                                                performSearch(updatedFilters); // Ensure search is performed with updated filters
                                            }}
                                        >
                                            <Icon source="close" size={16} color="#666" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}

                        {isLoading ? (
                            <ActivityIndicator size="small" color="#E95322" />
                        ) : (
                            <>
                                {searchResults.length === 0 && searchResults2.length === 0 && searchText ? (
                                    <Text style={styles.noResults}>No results found</Text>
                                ) : (
                                    <>
                                        <FlatList
                                            data={[
                                                ...searchResults.map(item => ({ ...item, type: 'dish' })),
                                                ...searchResults2.map(item => ({ ...item, type: 'store' }))
                                            ]}
                                            keyExtractor={(item) => `${item.type}-${item.id}`}
                                            renderItem={({ item }) => (
                                                <Pressable
                                                    style={styles.resultItem}
                                                    onPress={() => {
                                                        if (item.type === 'dish') {
                                                            router.push(`/category/${item.food_type_id}/${item.id}`);
                                                        } else {
                                                            router.push('/storePage');
                                                        }
                                                        setShowResults(false);
                                                        setSearchText('');
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri: item.type === 'dish' ? item.image : item.avatar_url }}
                                                        style={styles.resultImage}
                                                    />
                                                    <View>
                                                        <Text style={styles.itemName}>
                                                            {item.type === 'dish' ? item.name : item.store_name}
                                                        </Text>
                                                        <Text style={styles.itemPrice}>
                                                            {item.type === 'dish' ? `$${item.price}` : item.follower}
                                                        </Text>
                                                        <Text style={styles.itemDescription}>
                                                            {item.type === 'dish' ? item.description : item.address}
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            )}
                                            maxToRenderPerBatch={5}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </View>
                )}

                <View className="ml-2 mr-2 flex-row items-center rounded-full justify-center" style={styles.iconStyle}>
                    <Pressable onPress={() => router.push('/(home)/filter_page')}>
                        <Image
                            source={require('@/assets/images/icons/filter.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </Pressable>
                </View>
            </View>

            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={() => setShowCart(true)}>
                    <Icon source="cart-outline" color="#E95322" size={28} />
                </Pressable>
                {showCart && <Cart visible={showCart} onCancel={() => setShowCart(false)} />}
            </View>

            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={() => router.push('/notifications')}>
                    <Icon source="bell-outline" color="#E95322" size={28} />
                </Pressable>
            </View>

            <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={styles.iconStyle}>
                <Pressable onPress={() => router.push('/profile')}>
                    <Icon source="account-outline" color="#E95322" size={28} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        backgroundColor: "white",
        borderRadius: 12,
    },
    searchResults: {
        position: 'absolute',
        top: 45,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        maxHeight: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    resultImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
    },
    itemPrice: {
        fontSize: 12,
        color: '#E95322',
    },
    noResults: {
        textAlign: 'center',
        padding: 10,
        color: '#666',
    },
    filterChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        gap: 5,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 5,
    },
    filterChipText: {
        fontSize: 12,
        marginRight: 4,
    },
    itemDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});