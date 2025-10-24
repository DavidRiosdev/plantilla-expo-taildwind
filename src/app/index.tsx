import { BottomSheetCustom } from "@/components/ui/BottomSheetCustom";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-gray-400 justify-between pt-10">
          <View className="gap-10">
            <Button
              title="Show Success Toast"
              onPress={() => {
                Toast.success("Success message!");
              }}
            />

            <Button
              title="Show Error Toast"
              onPress={() => {
                Toast.error("Error message!");
              }}
            />

            <Button
              title="Show Info Toast"
              onPress={() => {
                Toast.info("Info message!");
              }}
            />

            <Button
              title="Show Warning Toast"
              onPress={() => {
                Toast.warn("Warning message!");
              }}
            />

            <ToastManager showProgressBar={false} />
          </View>

          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Press me
          </Button>

          <View className="h-[50%] bg-transparent">
            <BottomSheetCustom />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
