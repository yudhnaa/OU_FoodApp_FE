import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(welcome)" options={{ headerShown: false }} />
      <Stack.Screen name="(store)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="profile_menu" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
