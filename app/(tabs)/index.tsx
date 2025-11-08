import { useAuth } from "@/lib/auth-context";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Button mode="text" icon={"logout"} onPress={signOut}>
        Sign Out
      </Button>
    </View>
  );
}
