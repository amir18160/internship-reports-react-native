import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

import colors from "constants/colors";

type Props = {
  children: ReactElement;
  _rippleColor?: string;
};

export default function Profile({ children, _rippleColor }: Props) {
  return (
    <TouchableRipple
      borderless
      style={styles.ripple}
      rippleColor={_rippleColor ? _rippleColor : colors.primary[900]}
      onPress={() => {}}
    >
      {children}
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  ripple: {
    flex: 1,
  },
});
