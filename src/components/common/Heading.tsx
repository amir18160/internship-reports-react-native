import { StyleSheet, Text } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import colors from "constants/colors";

type Props = { children: string | ReactNode; style?: object; bgColor?: string };

export default function Heading({ children, style, bgColor }: Props): ReactElement {
  return (
    <Text
      style={[
        styles.heading,
        style && style,
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    color: colors.accent[400],
    backgroundColor: colors.primary[900],
    padding: 16,
    borderRadius: 16,
    fontFamily: "vazir500",
    fontSize: 24,
    textAlign: "center",
    maxHeight: 75,
    minHeight: 35,
  },
});
