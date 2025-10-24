import theme from "@/config/themeConfig";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../global.css";

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
