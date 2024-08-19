import MyButton from "@/src/components/reusable-components/MyButton";
import MyText from "@/src/components/reusable-components/MyText";
import MyTextInput from "@/src/components/reusable-components/MyTextInput";
import MyView from "@/src/components/reusable-components/MyView";
import { supabase } from "@/src/lib/database/supabase";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import Feather from "@expo/vector-icons/Feather";
import { type Href, Redirect, router, Stack } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const createPoll = async () => {
    setError("");
    if (!question) {
      setError("Please provide the question");
      return;
    }
    const validOptions = options.filter((o) => !!o);
    if (validOptions.length < 2) {
      setError("Please provide at least 2 valid options");
      return;
    }

    const { data, error } = await supabase
      .from("polls")
      .insert([{ question, options: validOptions }])
      .select();
    if (error) {
      Alert.alert("Failed to create the poll");
      console.log(error);
      return;
    }
    router.back();
    console.warn("Create");
  };

  if (!user) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <MyView className="p-3 gap-1">
      <Stack.Screen options={{ title: "Create poll" }} />

      <MyText className="font-medium mt-3">Title</MyText>
      <MyTextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Type your question"
        className="bg-white p-3 rounded-md"
      />

      <MyText className="font-medium mt-3">Options</MyText>
      {options.map((option, index) => (
        <MyView key={index} style={{ justifyContent: "center" }}>
          <MyTextInput
            value={option}
            onChangeText={(text: string) => {
              const updated = [...options];
              updated[index] = text;
              setOptions(updated);
            }}
            placeholder={`Option ${index + 1}`}
            className="bg-white p-3 rounded-md"
          />
          <Feather
            name="x"
            size={18}
            color="gray"
            onPress={() => {
              // delete option based index
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
            style={{ position: "absolute", right: 10 }}
          />
        </MyView>
      ))}

      <MyView className="gap-2 flex-col divide-y-2 mt-4">
        <MyButton
          title="Add option"
          onPress={() => setOptions([...options, ""])}
        />
        <MyButton title="Create poll" onPress={createPoll} />
      </MyView>
      <MyText style={{ color: "crimson" }}>{error}</MyText>
    </MyView>
  );
}
