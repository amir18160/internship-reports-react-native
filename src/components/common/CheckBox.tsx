import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

import React from "react";
import colors from "constants/colors";

type Props = {
  values: string[];
  active: number | string;
  onValueChange: (index: string) => void;
};

export default function CheckBox({ active, values, onValueChange }: Props) {
  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <View key={Math.random() + index + value} style={styles.item}>
          <Text style={styles.textStyle}>{value}</Text>
          <Checkbox
            color={colors.accent[500]}
            status={active === index || active === value ? "checked" : "unchecked"}
            onPress={() => onValueChange(value)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[950],
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  textStyle: {
    color: colors.accent[600],
    fontFamily: "mont400",
    fontSize: 14,
    textTransform: "capitalize",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.primary[900],
    borderRadius: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.slateGrey[800],
  },
});
