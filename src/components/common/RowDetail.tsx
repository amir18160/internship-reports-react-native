import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";

// components
import Number from "./Number";

// colors
import colors from "constants/colors";

type Props = {
  title: string;
  value?: string;
  unit?: string;
  icon?: ReactNode;
  button?: ReactElement;
};

export default function RowDetail({ title, unit, value, icon, button }: Props) {
  return (
    <View style={styles.rowDetailContainer}>
      <View style={styles.titleContainer}>
        {icon}
        <Text style={styles.rowDetailTitle}>{title}</Text>
      </View>
      <View style={styles.rowDetailContent}>
        <Text style={styles.unit}>{unit}</Text>
        <Number color={colors.accent[400]} size={20}>
          {value}
        </Number>
        {button}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowDetailContainer: {
    color: colors.accent[600],
    paddingHorizontal: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "center",
  },
  rowDetailTitle: {
    color: colors.accent[500],
    fontSize: 22,
    fontFamily: "vazir500",
  },
  rowDetailContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 4,
  },

  unit: {
    alignSelf: "flex-end",
    fontSize: 14,
    fontFamily: "vazir200",
    color: colors.accent[300],
  },
});
