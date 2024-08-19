import { useAuth } from "@/src/lib/providers/AuthProvider";
import { type Href, Redirect, Slot } from "expo-router";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/profile"} />;
  }

  return <Slot />;
}
