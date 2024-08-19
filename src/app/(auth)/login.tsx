import { useState } from "react";
import { Alert, AppState } from "react-native";
import { Stack } from "expo-router";
import { supabase } from "@/src/lib/database/supabase";
import MyView from "@/src/components/reusable-components/MyView";
import MyText from "@/src/components/reusable-components/MyText";
import MyTextInput from "@/src/components/reusable-components/MyTextInput";
import MyButton from "@/src/components/reusable-components/MyButton";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <MyView className="mt-10 p-4">
      <Stack.Screen options={{ title: "Login" }} />
      <MyText className="font-medium">Sign in or Create an account</MyText>
      <MyView className="mt-5 pt-1 self-stretch">
        <MyTextInput
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          className="bg-white p-3 rounded-md"
        />
      </MyView>
      <MyView className="mt-5 pt-1 self-stretch">
        <MyTextInput
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          className="bg-white p-3 rounded-md"
        />
      </MyView>
      <MyView className="mt-5 pt-1 self-stretch">
        <MyButton
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </MyView>
      <MyView className="mt-5 pt-1 self-stretch">
        <MyButton
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </MyView>
    </MyView>
  );
}
