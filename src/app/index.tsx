import { BottomSheetCustom } from "@/components/ui/BottomSheetCustom";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://expo.dev");
    setResult(result);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-gray-400 justify-between pt-10">
          <View className="gap-10">
            <Button
              mode="contained"
              onPress={() => Toast.success("Success message!")}
            >
              Show Success Toast
            </Button>

            <Button
              mode="contained"
              onPress={() => Toast.error("Error message!")}
            >
              Show Error Toast
            </Button>

            <Button
              mode="contained"
              onPress={() => Toast.info("Info message!")}
            >
              Show Info Toast
            </Button>

            <Button
              mode="contained"
              onPress={() => Toast.warn("Warning message!")}
            >
              Show Warning Toast
            </Button>

            <ToastManager showProgressBar={false} position="bottom" />
          </View>

          <Button
            buttonColor="secondary"
            mode="contained"
            onPress={_handlePressButtonAsync}
          >
            Open Browser
          </Button>

          <View className="h-[50%] bg-transparent">
            <BottomSheetCustom />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
