import { useAuth } from "@/src/lib/providers/AuthProvider";
import { type Href, Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/login" as Href} />;
  }

  return <Slot />;
}
