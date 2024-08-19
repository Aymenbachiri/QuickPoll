import { type Href, Stack } from "expo-router";
import { Alert, FlatList } from "react-native";
import MyLink from "../components/reusable-components/MyLink";
import MyText from "../components/reusable-components/MyText";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { supabase } from "../lib/database/supabase";
import Feather from "@expo/vector-icons/Feather";
import type { Poll } from "../lib/types/db";

export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log("Fetching...");

      let { data, error } = await supabase.from("polls").select("*");
      if (error) {
        Alert.alert("Error fetching data");
      }
      setPolls(data as Poll[]);
    };
    fetchPolls();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <MyLink href={"/polls/new"}>
              <Entypo name="circle-with-plus" size={24} color="black" />
            </MyLink>
          ),
          headerLeft: () => (
            <MyLink href={"/profile"}>
              <Feather name="user" size={24} color="black" />
            </MyLink>
          ),
        }}
      />
      <FlatList
        data={polls}
        style={{ backgroundColor: "gainsboro" }}
        contentContainerStyle={{ flex: 1, padding: 10, gap: 5 }}
        renderItem={({ item }) => (
          <MyLink
            href={`./polls/${item.id}`}
            className="bg-white p-3 rounded-md"
          >
            <MyText className="font-bold" wp="3%">
              Example poll question
            </MyText>
          </MyLink>
        )}
      />
    </>
  );
}
