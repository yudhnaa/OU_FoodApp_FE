import {transformFileAsync} from '@babel/core'
import {router, Stack, useRouter} from 'expo-router'
import {View, Text, Pressable, TextInput} from 'react-native'
import {StyleSheet} from 'react-native'
import {Icon} from 'react-native-paper'
import FoodProvider from './category/FoodContext'
import BackButton from '@/components/home/backButton'
import colors from "@/styles/colors";
import { CartProvider } from '@/components/home/cartContext'


export default function HomeLayout() {
    return (
        <FoodProvider>
            <CartProvider>
            <Stack screenOptions={{
                headerShown: true,
                headerStyle: {backgroundColor: '#F5CB58'},
                headerShadowVisible: false,
            }}>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="category" options={{headerShown: false}}/>
                <Stack.Screen name="profile" options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: colors.Orange_Base},
                    headerTitle: "",
                    headerTitleStyle: styles.headerTitle,
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Pressable onPressIn={() => {
                            router.back()
                        }}>
                            <Icon
                                source="chevron-left"
                                color={colors.Orange_2}
                                size={35}
                            />
                        </Pressable>
                    )
                }}/>
                <Stack.Screen name="best_seller" options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    headerTitle: "Best Seller",
                    headerTitleStyle: styles.headerTitle,
                    headerTitleAlign: "center",
                    headerLeft: () => (<BackButton/>)
                }}/>
                <Stack.Screen name="help_with_order" options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    headerTitleStyle: styles.headerTitle,
                    headerTitle: "Support",
                    headerTitleAlign: "center",
                    headerLeft: () => (<BackButton/>)
                }}/>

                <Stack.Screen name="help_center" options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    headerTitleStyle: styles.headerTitle,
                    headerTitle: () => {
                        return (
                            <View className='flex-col items-center pt-4'>
                                <Text style={styles.headerTitle}>Help Center</Text>
                                <Text style={styles.helpCenterDescription}>How can we help you?</Text>
                            </View>
                        )
                    },
                    headerTitleAlign: "center",
                    headerLeft: () => (<BackButton/>)
                }}/>

                <Stack.Screen name="recommend_page" options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    headerTitle: "Recommendation",
                    headerTitleStyle: styles.headerTitle,
                    headerTitleAlign: "center",
                    headerLeft: () => (<BackButton/>)
                }}/>

                <Stack.Screen name="filter_page" options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: '#F5CB58'},
                    headerTitle: "Filter",
                    headerTitleStyle: styles.headerTitle,
                    headerTitleAlign: "center",
                    headerLeft: () => (<BackButton/>)
                }}/>

                <Stack.Screen
                    name="myProfile"
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "My Profile",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}/>
                <Stack.Screen
                    name="deliveryAddress"
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "Delivery Address",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}
                />
                <Stack.Screen
                    name="addAddress"
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "Delivery Address",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}
                />
                <Stack.Screen
                    name="paymentMethods"
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "Payment Methods",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}
                />


                <Stack.Screen
                    name="(payment)"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="FaqAndContactUs"
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "Contact Us",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}
                />

                <Stack.Screen
                    name="(settings)"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="notifications"
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "Notifications",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}
                />

                <Stack.Screen
                    name="(cart)"
                    options={{
                        headerShown: false,
                        headerStyle: {backgroundColor: '#F5CB58'},
                        title: "Notifications",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => (<BackButton/>)
                    }}
                />


            </Stack>
            </CartProvider>
        </FoodProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#F8F8F8",
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F8C471', // Màu nền của header
        padding: 10,
        paddingTop: 40, // Để tạo khoảng cách cho status bar
    },
    searchInput: {
        height: 25,
        fontSize: 12,
        width: 100,
    },
    txtGreeting: {
        fontSize: 30,
        fontFamily: "Spartan_700Bold"
    },
    headerTitle: {
        fontFamily: "Spartan_700Bold",
        fontSize: 26,
        color: "#f8f8f8",
    },
    helpCenterDescription: {
        fontSize: 14,
        fontFamily: "Spartan_500Medium",
        textAlign: "justify",
        paddingBottom: 15,
        color: "#E95322"
    }
})