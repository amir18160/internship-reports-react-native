import { StyleSheet, Text } from "react-native";
import { Button as _Button, ActivityIndicator } from "react-native-paper";
import React, { ReactNode } from "react";
import colors from "constants/colors";

type Props = {
  isPending?: boolean;
  style?: object;
  buttonContentStyle?: object;
  labelStyle?: object;
  icon?: string;
  mode?: "text" | "contained" | "outlined" | "elevated" | "contained-tonal" | undefined;
  rippleColor?: string;
  label?: string;
  children?: ReactNode;
  onPress?: any;
  disbaled?: boolean;
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
  buttonContentStyle,
  labelStyle,
  disbaled,
}: Props) {
  return (
    <_Button
      style={[styles.button, style]}
      icon={icon}
      rippleColor={rippleColor ? rippleColor : colors.accent["200"]}
      mode={mode ? mode : "contained"}
      contentStyle={[styles.buttonContent, buttonContentStyle]}
      labelStyle={[styles.buttonText, labelStyle]}
      onPress={onPress}
      disabled={disbaled}
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
    minWidth: 100,
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
