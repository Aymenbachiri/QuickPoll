import type { MyTextInputProps } from "@/src/lib/types/reusableComponentsTypes";
import { TextInput } from "react-native";

export default function MyTextInput({
  value,
  onChangeText,
  placeholder,
  ...props
}: MyTextInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...props}
    />
  );
}
