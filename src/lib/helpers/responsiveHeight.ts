import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const responsiveHeight = (percentage: string | number): number => {
  return hp(percentage);
};
