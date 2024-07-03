import { StyleSheet, Text } from "react-native";
import { ReactElement } from "react";

type Props = {
  size?: number;
  style?: object;
  children: string | undefined;
  color?: string;
};

export default function Number({ size, color, style, children }: Props): ReactElement {
  return (
    <Text style={[styles.numberStyle, { fontSize: size, color }, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  numberStyle: {
    fontFamily: "mont400",
  },
});
