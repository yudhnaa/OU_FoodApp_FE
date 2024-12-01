import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: true }} />
    <Stack.Screen name="first" options={{ headerShown: false }} />
    <Stack.Screen name="welcome" options={{ headerShown: false }} />
  </Stack>;
}
