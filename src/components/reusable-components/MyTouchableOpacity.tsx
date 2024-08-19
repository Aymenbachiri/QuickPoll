import { responsiveHeight } from "@/src/lib/helpers/responsiveHeight";
import { responsiveWidth } from "@/src/lib/helpers/responsiveWidth";
import type { MyTouchableOpacityProps } from "@/src/lib/types/reusableComponentsTypes";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function MyTouchableOpacity({
  children,
  wp,
  hp,
  style,
  ...props
}: MyTouchableOpacityProps) {
  const styles = StyleSheet.create({
    responsiveStyle: {
      width: wp ? responsiveWidth(wp) : undefined,
      height: hp ? responsiveHeight(hp) : undefined,
    },
  });

  return (
    <TouchableOpacity style={[styles.responsiveStyle, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
}
