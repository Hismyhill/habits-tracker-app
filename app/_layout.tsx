import AuthProvider, { useAuth } from "@/lib/auth-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function InitialLayout() {
  const { user } = useAuth();

  return (
    <Stack>
      <StatusBar />
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="auth" options={{ title: "Authentication" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider theme={DefaultTheme}>
          <InitialLayout />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
