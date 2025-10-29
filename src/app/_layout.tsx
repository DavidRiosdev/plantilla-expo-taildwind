import theme from "@/config/themeConfig";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useAuthUser } from "@/store/useAuthUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import "../global.css";
import FlashMessage from "react-native-flash-message";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 🚫 no reintentar en fallos
    },
  },
});

export default function Layout() {
  const { isAuthenticated, getMe, isLoadingInitialData } = useAuthUser();
  const { fontsLoaded } = useLoadFonts();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoadingInitialData) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <FlashMessage position="top" />
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
