import OfflineNotice from "@/components/ui/OfflineNotice";
import theme from "@/config/themeConfig";
import { NetworkProvider } from "@/context/NetworkContext";
import useInitialData from "@/hooks/useInitialData";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useAuthUser } from "@/store/useAuthUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import "../global.css";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 🚫 no reintentar en fallos
    },
  },
});

export default function Layout() {
  const { isAuthenticated, isLoadingInitialData } = useAuthUser();
  const { fontsLoaded } = useLoadFonts();
  useInitialData(); // Carga datos de usuario

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
        <StatusBar style="auto" />
        <NetworkProvider>
          <Stack>
            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen name="sing-in" />
            </Stack.Protected>
          </Stack>
          <OfflineNotice />
        </NetworkProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
