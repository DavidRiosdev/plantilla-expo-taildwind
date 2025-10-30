import { useAuthUser } from "@/store/useAuthUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { userLogged, logout } = useAuthUser();

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <Text className="text-3xl font-bold">Settings</Text>
      <View className="flex-1 justify-between items-center">
        <View className="w-full">
          <List.Item
            title={<Text className="font-semibold">Account Profile</Text>}
            style={styles.list_item}
            rippleColor="transparent"
            left={() => (
              <Ionicons name="person-outline" size={24} color="black" />
            )}
            right={() => (
              <Ionicons name="chevron-forward-sharp" size={20} color="gray" />
            )}
            onPress={() => {
              router.push("/modal-edit-account");
            }}
          />
          <List.Item
            title={<Text className="font-semibold text-red-500">Log Out</Text>}
            style={styles.list_item}
            rippleColor="transparent"
            left={() => (
              <Ionicons name="log-out-outline" color="red" size={24} />
            )}
            right={() => (
              <Ionicons name="chevron-forward-sharp" size={20} color="gray" />
            )}
            onPress={logout}
          />
        </View>

        {/* <Link asChild push href="/modal-edit-account">
          <Button>Abrir modal</Button>
        </Link> */}

        <Text className="text-base font-regular text-slate-300">Version:</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list_item: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F6",
    width: "100%",
    paddingVertical: 12,
  },
});
