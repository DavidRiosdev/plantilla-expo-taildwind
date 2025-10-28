import { useAuthUser } from "@/store/useAuthUser";
import { Text, View } from "react-native";
import { Button, List } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { userLogged, getMe } = useAuthUser();

  const fetchUser = async () => {
    try {
      await getMe();
    } catch (error: any) {
      console.error("Error al obtener usuario:", error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 m-10">
        <View className="gap-4">
          <Text className="text-2xl">Datos del usuario</Text>
          <List.Section>
            <List.Item
              title="Nombre"
              description={userLogged?.name}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              title="Apellido"
              description={userLogged?.lastname}
              left={(props) => <List.Icon {...props} icon="account-outline" />}
            />
            <List.Item
              title="email"
              description={userLogged?.email}
              left={(props) => <List.Icon {...props} icon="account-outline" />}
            />
            <List.Item
              title="Rol"
              description={userLogged?.role}
              left={(props) => <List.Icon {...props} icon="account-outline" />}
            />
            <List.Item
              title="estado"
              description={userLogged?.status}
              left={(props) => <List.Icon {...props} icon="account-outline" />}
            />
          </List.Section>

          <Button mode="contained" onPress={fetchUser}>
            Get me
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
