import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const theme = useTheme();
  const { signIn, signUp } = useAuth();

  async function handleAuth() {
    setError(null);
    if (!password || !email) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (isSignUp) {
      // This should be for sign in
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      // This should be for sign up
      const error = await signUp(email, password, signIn(email, password));
      if (error) {
        setError(error);
        return;
      }
    }
    router.replace("/");
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Welcome back" : "Create an account"}
        </Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          label="Password"
          placeholder="password"
          secureTextEntry={true}
          textContentType="password"
          autoCorrect={false}
          autoCapitalize="none"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
        />
        {error && (
          <Text style={{ color: theme.colors.error, marginBottom: -16 }}>
            {error}
          </Text>
        )}
        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignUp ? "Sign in" : "Create an account"}
        </Button>
        <Button mode="text" onPress={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});
