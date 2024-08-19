import { responsiveHeight } from "@/src/lib/helpers/responsiveHeight";
import { responsiveWidth } from "@/src/lib/helpers/responsiveWidth";
import type { MyTextProps } from "@/src/lib/types/reusableComponentsTypes";
import { Text, StyleSheet } from "react-native";

export default function MyText({
  children,
  wp,
  hp,
  style,
  ...props
}: MyTextProps) {
  const styles = StyleSheet.create({
    responsiveStyle: {
      fontSize: wp ? responsiveWidth(wp) : undefined,
      height: hp ? responsiveHeight(hp) : undefined,
    },
  });

  return (
    <Text style={[styles.responsiveStyle, style]} {...props}>
      {children}
    </Text>
  );
}
