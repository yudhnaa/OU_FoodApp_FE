import { View, Text, Pressable } from 'react-native'
import { Button, Icon } from 'react-native-paper';
import { router, Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export default function WelcomeLayout() {
    // route = useRouter()
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTitleStyle: styles.title,
            headerStyle: { backgroundColor: '#F5CB58' },
            headerShadowVisible: false,
            headerLeft: () =>
            (<View>
                <Pressable onPressIn={() => { router.back() }}>
                    <Icon
                        source="chevron-left"
                        color={"#E95322"}
                        size={35}
                    />
                </Pressable>
            </View>),
        }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="registration" options={{ headerShown: true, title: "New Account" }} />
            <Stack.Screen name="login" options={{ headerShown: true, title: "Login" }} />
        </Stack>
    );
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
})