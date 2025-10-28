import { BottomSheetCustom } from "@/components/ui/BottomSheetCustom";
import { useAuthUser } from "@/store/useAuthUser";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

export default function settings() {
  const { logout } = useAuthUser();

  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://expo.dev");
    setResult(result);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-gray-400 justify-between pt-10">
          <View className="grid grid-cols-2">
            <Text className="font-bold text-3xl">Pruba de texto classname</Text>
            <Text className="font-regular text-lg">Pruba de texto regular</Text>
            <Text className="font-medium text-lg">Pruba de texto </Text>
            <Text className="font-semi-bold text-lg">Pruba de texto</Text>
            <Text className="font-bold text-lg">Pruba de texto</Text>

            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>
              Pruba de texto styles
            </Text>
            <View className="flex gap-3">
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}>
                Pruba de texto
              </Text>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 16 }}>
                Pruba de texto
              </Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16 }}>
                Pruba de texto
              </Text>
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16 }}>
                Pruba de texto
              </Text>
            </View>
          </View>
          <Text>settings</Text>

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

            <Button mode="contained" buttonColor="red" onPress={logout}>
              Log Out
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
