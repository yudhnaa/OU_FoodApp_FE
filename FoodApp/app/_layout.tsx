import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(intro)" options={{ headerShown: false }} />
        </Stack>
    );
}
