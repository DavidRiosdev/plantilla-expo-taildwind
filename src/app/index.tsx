import { BottomSheetCustom } from "@/components/ui/BottomSheetCustom";
import { Button, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

export default function App() {
  return (
    <View className="flex-1 bg-gray-400 justify-between pt-10">
      <ToastManager showProgressBar={false} />
      <View className="gap-10">
        <Button
          title="Show Success Toast"
          onPress={() => {
            Toast.success("Success message!", { hideProgressBar: false });
          }}
        />

        <Button
          title="Show Error Toast"
          onPress={() => {
            Toast.show({
              type: "error",
              text1: "Error message!",
              position: "bottom",
              autoHide: false,
              progressBarColor: "transparent",
            });
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

        {/* Toast provider should be at the root level */}
        <ToastManager />
      </View>

      <View className="h-[50%] bg-transparent">
        <BottomSheetCustom />
      </View>
    </View>
  );
}
