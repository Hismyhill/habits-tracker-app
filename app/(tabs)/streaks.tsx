import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function SreaksScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>Create Account</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
