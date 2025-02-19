import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
    // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
