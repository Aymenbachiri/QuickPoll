import MyButton from "@/src/components/reusable-components/MyButton";
import MyText from "@/src/components/reusable-components/MyText";
import MyView from "@/src/components/reusable-components/MyView";
import { supabase } from "@/src/lib/database/supabase";
import { useAuth } from "@/src/lib/providers/AuthProvider";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <MyView style={{ padding: 10 }}>
      <MyText>User id: {user?.id}</MyText>

      <MyButton title="Sign out" onPress={() => supabase.auth.signOut()} />
    </MyView>
  );
}
