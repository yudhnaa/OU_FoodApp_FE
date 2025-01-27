import {Stack} from "expo-router";
import '../global.css';
import {AuthProvider} from "@/components/AuthContext";


export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="(welcome)" options={{headerShown: false}}/>
                <Stack.Screen name="(home)" options={{headerShown: false}}/>
                {/* <Stack.Screen name="profile_menu" options={{ headerShown: false }} /> */}
            </Stack>
        </AuthProvider>

    );
}
