import MyPressable from "@/src/components/reusable-components/MyPressable";
import MyText from "@/src/components/reusable-components/MyText";
import MyView from "@/src/components/reusable-components/MyView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import MyButton from "@/src/components/reusable-components/MyButton";

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState("");
  const vote = () => {
    console.warn("Vote", selected);
  };

  const poll = {
    question: "React Native vs Fluter?",
    options: ["React Native FTW", "Flutter", "SwiftUI"],
  };

  return (
    <MyView className="p-3 gap-5">
      <Stack.Screen options={{ title: "Poll voting" }} />
      <MyText wp="3%" className="font-semibold">
        {poll.question}
      </MyText>

      <MyView style={{ gap: 5 }}>
        {poll.options.map((option) => (
          <MyPressable
            onPress={() => setSelected(option)}
            key={option}
            className="bg-white p-3 rounded-md flex-row items-center gap-3"
          >
            <Feather
              name={option === selected ? "check-circle" : "circle"}
              size={18}
              color={option === selected ? "green" : "gray"}
            />
            <MyText>{option}</MyText>
          </MyPressable>
        ))}
      </MyView>
      <MyButton onPress={vote} title="Vote" />
    </MyView>
  );
}
