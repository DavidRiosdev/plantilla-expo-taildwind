import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useAuthUser } from "@/store/useAuthUser";

export default function settings() {
  const { logout } = useAuthUser();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>settings</Text>
      <Button mode="contained" onPress={logout}>
        Log Out
      </Button>
    </View>
  );
}
