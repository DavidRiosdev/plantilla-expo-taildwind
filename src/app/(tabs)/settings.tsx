import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "@/utils/authStore";
import { Button } from "react-native-paper";

export default function settings() {
  const { logOut } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>settings</Text>
      <Button mode="contained" onPress={logOut}>
        Log Out
      </Button>
    </View>
  );
}
