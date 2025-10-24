import { BottomSheetCustom } from "@/components/ui/BottomSheetCustom";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 bg-gray-400 justify-between pt-10">
      <Text>Hola mundo</Text>
      <View className="h-[50%] bg-transparent">
        <BottomSheetCustom />
      </View>
    </View>
  );
}
