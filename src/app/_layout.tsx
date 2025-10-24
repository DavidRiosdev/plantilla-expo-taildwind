import theme from "@/config/themeConfig";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const isLogged = false;
const shouldCreateAccount = true;

export default function Layout() {
  const { fontsLoaded } = useLoadFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // pantalla vacía mientras carga la fuente
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Protected guard={isLogged}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLogged}>
          <Stack.Screen name="sing-in" />
          <Stack.Protected guard={shouldCreateAccount}>
            <Stack.Screen name="create-account" />
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  );
}
