import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import SingIn from "./sing-in";

const shouldCreateAccount = false;

export default function CreateAccount() {
  if (shouldCreateAccount) {
    return <Redirect href={"sing-in"} />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Create account view</Text>
    </View>
  );
}
