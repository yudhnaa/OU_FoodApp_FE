import { Stack } from "expo-router";
import Header from "@/components/store/header";
import BackButton from "@/components/home/backButton";
import colors from "@/styles/colors";
import FoodProvider from "@/app/(store)/manage/FoodDetailsContext";


export default function ManageLayout() {
    return (
        <FoodProvider>
            <Stack screenOptions={{
                headerShown: true,
                headerStyle: {backgroundColor: '#F5CB58'},
                headerShadowVisible: false,
            }}>
                <Stack.Screen name="index" options={{
                    headerShown: true,
                    headerTitle : "Dish Management",
                    headerLeft : () => <BackButton/>,
                    headerTitleAlign: "center",
                    headerTitleStyle : {
                        fontSize : 20,
                        color : colors.Font_2,
                        fontFamily : "Spartan_700Bold",
                    }
                }}/>

                <Stack.Screen name="[id]" options={{
                    headerShown: true,
                    headerTitle : "Dish Management",
                    headerLeft : () => <BackButton/>,
                    headerTitleAlign: "center",
                    headerTitleStyle : {
                        fontSize : 20,
                        color : colors.Font_2,
                        fontFamily : "Spartan_700Bold",
                    }
                }}/>

                <Stack.Screen name="createDish" options={{
                    headerShown: true,
                    headerTitle : "Dish Management",
                    headerLeft : () => <BackButton/>,
                    headerTitleAlign: "center",
                    headerTitleStyle : {
                        fontSize : 20,
                        color : colors.Font_2,
                        fontFamily : "Spartan_700Bold",
                    }
                }}/>
            </Stack>
        </FoodProvider>
    );
}