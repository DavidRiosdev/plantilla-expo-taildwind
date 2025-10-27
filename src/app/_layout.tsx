import theme from "@/config/themeConfig";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useAuthUser } from "@/store/useAuthUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { isAuthenticated } = useAuthUser();
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 🚫 no reintentar en fallos
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="sing-in" />
          </Stack.Protected>
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
