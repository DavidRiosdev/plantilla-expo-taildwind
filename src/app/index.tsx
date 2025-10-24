import { BottomSheetCustom } from "@/components/ui/BottomSheetCustom";
import { Button, View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

export default function App() {
  return (
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

      <View className="h-[50%] bg-transparent">
        <BottomSheetCustom />
      </View>
    </View>
  );
}
