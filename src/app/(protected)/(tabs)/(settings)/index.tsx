import { useAuthUser } from "@/store/useAuthUser";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { userLogged, logout } = useAuthUser();

  return (
    <SafeAreaView className="flex-1 p-6 ">
      <Text className="mb-6 text-2xl font-bold">Settings</Text>
      <View className="flex-1 justify-between items-center">
        <View className="w-full">
          <List.Item
            title={<Text className="font-semibold">Account Profile</Text>}
            style={styles.list_item}
            left={() => (
              <Ionicons name="person-outline" size={24} color="black" />
            )}
            right={() => (
              <Ionicons name="chevron-forward-sharp" size={24} color="gray" />
            )}
            onPress={() => {
              console.log("Account profile ");
            }}
          />
          <List.Item
            title={<Text className="font-semibold">Log Out</Text>}
            titleStyle={{ color: "red", fontWeight: "bold" }}
            style={styles.list_item}
            left={() => (
              <Ionicons name="log-out-outline" color="red" size={24} />
            )}
            right={() => (
              <Ionicons name="chevron-forward-sharp" size={24} color="gray" />
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
    borderBottomColor: "#C6C6C6",
    width: "100%",
  },
});
