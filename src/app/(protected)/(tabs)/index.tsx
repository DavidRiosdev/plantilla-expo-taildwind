import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button } from "react-native-paper";

export default function index() {
  return (
    <View>
      <Text>index</Text>

      {/* Modal */}
      <Link asChild push href="/modal">
        <Button>Abrir modal</Button>
      </Link>
    </View>
  );
}
