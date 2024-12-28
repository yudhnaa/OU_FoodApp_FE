import { router, Stack, useRouter } from 'expo-router'
import { View, Text, Pressable,TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'

export default function HomeLayout() {
    return (
        <Stack screenOptions={{
            headerShown:true,
            headerStyle: { backgroundColor: '#F5CB58' },
            headerShadowVisible: false,
            headerTitle: () => (
                <View className="flex-1 flex-row items-center mt-2" style={{flexWrap:"wrap"}}>
                    <TextInput
                        className="bg-white w-[65%] rounded-full h-10 px-3 text-base"
                        placeholder="Search"
                        style={{fontSize : 12}}
                    />
                    <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={{backgroundColor : "white",borderRadius:12}}>
                        <Pressable>
                            <Icon
                                source="cart-outline"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
                    <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={{backgroundColor : "white",borderRadius:12}}>
                        <Pressable>
                            <Icon
                                source="bell-outline"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
                    <View className="ml-2 flex-row items-center justify-center w-10 h-10" style={{backgroundColor : "white",borderRadius:12}}>
                        <Pressable>
                            <Icon
                                source="account-outline"
                                color={"#E95322"}
                                size={28}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <Text className='text-white text-lg font-bold mt-3 pt-2' style={styles.txtGreeting}>Good Morning</Text>
                        <Text className='font-bold text-white mb-2' style={{color:"#E95322"}}>Rise and shine! It's breakfast time</Text>
                    </View>
                </View>
            )
        }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        </Stack>
        
    )
}

const styles = StyleSheet.create({
    title: {
      color: "#F8F8F8",
      fontSize: 25,
      fontWeight: "700",
      alignSelf: "center",
      marginTop: 30,
      marginBottom: 20
    },
    header: {
        backgroundColor: '#F8C471', // Màu nền của header
        padding: 10,
        paddingTop: 40, // Để tạo khoảng cách cho status bar
      },
    searchInput: {
        height: 25,
        fontSize : 12,
        width: 100,
    },
    txtGreeting:{
        fontSize:30,
        fontFamily : "Spartan_700Bold"
    }
})