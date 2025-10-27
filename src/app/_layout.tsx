import theme from "@/config/themeConfig";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import axios from "axios";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "../global.css";
import { useAuthStore } from "@/store/authStore";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { isLoggedIn, shouldCreateAccount } = useAuthStore();
  const { fontsLoaded } = useLoadFonts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://7b9578ae2741.ngrok-free.app/api/init"
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sing-in" />
          <Stack.Protected guard={shouldCreateAccount}>
            <Stack.Screen name="create-account" />
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  );
}
