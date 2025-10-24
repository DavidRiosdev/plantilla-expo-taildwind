import theme from "@/config/themeConfig";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "../global.css";

SplashScreen.preventAutoHideAsync();

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
      <Slot />
    </PaperProvider>
  );
}
