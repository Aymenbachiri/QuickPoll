import { Stack } from "expo-router";
import AuthProvider from "../lib/providers/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ title: "Login" }} />
      </Stack>
    </AuthProvider>
  );
}
