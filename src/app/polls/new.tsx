import MyButton from "@/src/components/reusable-components/MyButton";
import MyText from "@/src/components/reusable-components/MyText";
import MyTextInput from "@/src/components/reusable-components/MyTextInput";
import MyView from "@/src/components/reusable-components/MyView";
import Feather from "@expo/vector-icons/Feather";
import { Stack } from "expo-router";
import { useState } from "react";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const createPoll = () => {
    console.warn();
  };

  return (
    <MyView className="p-3 gap-1">
      <Stack.Screen options={{ title: "Create poll" }} />

      <MyText className="font-medium mt-3">{poll.question}</MyText>
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

      <MyButton
        title="Add option"
        onPress={() => setOptions([...options, ""])}
      />
      <MyButton title="Create poll" onPress={createPoll} />
    </MyView>
  );
}
