import { useAuthUser } from "@/store/useAuthUser";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function settings() {
  const { logout } = useAuthUser();

  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://expo.dev");
    setResult(result);
  };

  // ref

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="justify-between flex-1 pt-10 bg-gray-400">
          <View className="grid grid-cols-2">
            <Text className="text-3xl font-bold">Pruba de texto classname</Text>
            <Text className="text-lg font-regular">Pruba de texto regular</Text>
            <Text className="text-lg font-medium">Pruba de texto </Text>
            <Text className="text-lg font-semi-bold">Pruba de texto</Text>
            <Text className="text-lg font-bold">Pruba de texto</Text>

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
              onPress={() =>
                showMessage({
                  message: "Success message!",
                  icon: "success",
                  type: "success",
                })
              }
            >
              Show Success Toast
            </Button>

            <Button
              mode="contained"
              onPress={() =>
                showMessage({
                  message: "Error message!",
                  icon: "danger",
                  type: "danger",
                })
              }
            >
              Show Error Toast
            </Button>

            <Button mode="contained" buttonColor="red" onPress={logout}>
              Log Out
            </Button>
          </View>

          <Button
            buttonColor="secondary"
            mode="contained"
            onPress={_handlePressButtonAsync}
          >
            Open Browser
          </Button>
        </View>
      </SafeAreaView>

      <GestureHandlerRootView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <BottomSheetModalProvider>
          <Button onPress={handlePresentModalPress}>
            title="Abrir Bottom Sheet"
          </Button>

          <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["50%"]}>
            <BottomSheetView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>¡Hola desde el Bottom Sheet! 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
