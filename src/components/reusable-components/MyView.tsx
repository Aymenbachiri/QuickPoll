import { responsiveHeight } from "@/src/lib/helpers/responsiveHeight";
import { responsiveWidth } from "@/src/lib/helpers/responsiveWidth";
import type { MyViewProps } from "@/src/lib/types/reusableComponentsTypes";
import { View, StyleSheet } from "react-native";

export default function MyView({
  children,
  wp,
  hp,
  style,
  ...props
}: MyViewProps) {
  const styles = StyleSheet.create({
    responsiveStyle: {
      width: wp ? responsiveWidth(wp) : undefined,
      height: hp ? responsiveHeight(hp) : undefined,
    },
  });

  return (
    <View style={[styles.responsiveStyle, style]} {...props}>
      {children}
    </View>
  );
}
