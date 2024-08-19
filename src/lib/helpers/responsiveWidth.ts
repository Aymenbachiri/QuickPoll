import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const responsiveWidth = (percentage: string | number): number => {
  return wp(percentage);
};
