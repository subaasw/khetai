import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      <Stack.Screen name="viewNotification" options={{ headerShown: false }} />
      <Stack.Screen name="productDetails" options={{ headerShown: false }} />
      <Stack.Screen name="priceListing" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />

    </Stack>
    // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
