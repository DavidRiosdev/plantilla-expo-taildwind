// components/OfflineNotice.jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useNetwork } from "@/context/NetworkContext";

export default function OfflineNotice() {
  const { isConnected } = useNetwork();

  if (isConnected) {
    console.log("estado de conexión conectado");
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No hay conexión a internet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FF9595",
    borderRadius: 16,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
});
