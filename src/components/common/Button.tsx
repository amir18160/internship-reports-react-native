import { StyleSheet, Text, View } from "react-native";
import { Button as _Button, ActivityIndicator } from "react-native-paper";
import React, { ReactNode } from "react";
import colors from "constants/colors";

type Props = {
  isPending?: boolean;
  style?: object;
  icon?: string;
  mode?: "text" | "contained" | "outlined" | "elevated" | "contained-tonal" | undefined;
  rippleColor?: string;
  label?: string;
  children?: ReactNode;
  onPress?: any;
};

export default function Button({
  isPending,
  onPress,
  style,
  icon,
  mode,
  rippleColor,
  label,
  children,
}: Props) {
  return (
    <_Button
      style={[styles.button, style]}
      icon={icon}
      rippleColor={rippleColor ? rippleColor : colors.accent["200"]}
      mode={mode ? mode : "contained"}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonText}
      onPress={onPress}
    >
      {isPending ? (
        <ActivityIndicator animating={true} color={colors.primary[700]} />
      ) : (
        <>
          <Text>{label}</Text>
          {children}
        </>
      )}
    </_Button>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row-reverse",
    height: 55,
    minWidth: 150,
    backgroundColor: colors.accent[600],
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "vazir400",
    padding: 5,
    marginBottom: 3,
    color: colors.white,
  },
  button: {
    borderRadius: 16,
  },
});
