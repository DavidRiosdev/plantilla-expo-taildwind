import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal-edit-account"
        options={{
          title: "Modal settings",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
