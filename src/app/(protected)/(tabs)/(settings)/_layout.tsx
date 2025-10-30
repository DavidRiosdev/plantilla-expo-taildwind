import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal-edit-account"
        options={{
          title: "Modal settings",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable className="mr-3" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.black} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
