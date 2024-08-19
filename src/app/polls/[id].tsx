import MyPressable from "@/src/components/reusable-components/MyPressable";
import MyText from "@/src/components/reusable-components/MyText";
import MyView from "@/src/components/reusable-components/MyView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import MyButton from "@/src/components/reusable-components/MyButton";
import type { Poll, Vote } from "@/src/lib/types/db";
import { supabase } from "@/src/lib/database/supabase";
import { ActivityIndicator, Alert } from "react-native";
import { useAuth } from "@/src/lib/providers/AuthProvider";

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll>();
  const [userVote, setUserVote] = useState<Vote>();

  const [selected, setSelected] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number.parseInt(id))
        .single();
      if (error) {
        Alert.alert("Error fetching data");
      }
      setPoll(data);
    };

    const fetchUserVote = async () => {
      if (!user) {
        return;
      }
      let { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id))
        .eq("user_id", user.id)
        .limit(1)
        .single();

      setUserVote(data);
      if (data) {
        setSelected(data.option);
      }
    };

    fetchPolls();
    fetchUserVote();
  }, []);

  const vote = async () => {
    const newVote = {
      option: selected,
      poll_id: poll?.id,
      user_id: user?.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }
    const { data, error } = await supabase
      .from("votes")
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      console.log(error);
      Alert.alert("Failed to vote");
    } else {
      setUserVote(data);
      Alert.alert("Thank you for your vote");
    }
  };

  if (!poll) {
    return <ActivityIndicator />;
  }

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
