import type { LinkProps } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import type {
  ButtonProps,
  ImageProps,
  PressableProps,
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from "react-native";

export interface MyTextProps extends TextProps {
  children: React.ReactNode;
  wp?: string | number;
  hp?: string | number;
}

export interface MyViewProps extends ViewProps {
  children: React.ReactNode;
  wp?: string | number;
  hp?: string | number;
}

export interface MyTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode;
  wp?: string | number;
  hp?: string | number;
}

export interface MyImageProps extends ImageProps {
  wp?: string | number;
  hp?: string | number;
  br?: string | number;
}

export interface MyLinkProps extends LinkProps<string | object> {}

export interface MyPressableProps extends PressableProps {
  onPress: () => void;
}

export interface MyButtonProps extends ButtonProps {
  onPress: () => void;
  title: string;
}

export interface MyTextInputProps extends TextInputProps {
  value: string;
  onChangeText: any;
  placeholder: string;
}
