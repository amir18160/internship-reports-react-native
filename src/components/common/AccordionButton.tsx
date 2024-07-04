import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import colors from "constants/colors";

import { AntDesign } from "@expo/vector-icons";

type Props = {
  title: string;
  startDate: string;
  endDate: string;
  sum: number;
  onPress: (event: GestureResponderEvent) => void;
};

export default function AccordionButton({
  onPress,
  endDate,
  startDate,
  sum,
  title,
}: Props) {
  return (
    <TouchableRipple
      borderless
      onPress={onPress}
      rippleColor={colors.accent[200]}
      style={styles.rippleStyles}
    >
      <View style={styles.colContainer}>
        <View style={styles.col}>
          <Text style={[styles.colItem, styles.title, styles.borderButtom]}>
            این هفته
          </Text>
          <View style={[styles.colItem, styles.sumContainer]}>
            <Text style={styles.sumNum}>5</Text>
            <Text style={styles.sumText}>مجموع ساعات</Text>
            <AntDesign name="clockcircle" color={colors.primary[800]} size={18} />
          </View>
        </View>

        <View style={styles.col}>
          <View style={[styles.colItem, styles.borderButtom, styles.dateContainer]}>
            <Text style={[styles.fontMont, styles.date]}>1403/08/05</Text>
            <Text style={styles.dateLabel}>تاریخ شروع/</Text>
          </View>

          <View style={[styles.colItem, styles.borderButtom, styles.dateContainer]}>
            <Text style={[styles.fontMont, styles.date]}>1403/08/05</Text>
            <Text style={styles.dateLabel}>تاریخ پایان/</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  rippleStyles: {
    marginVertical: 10,
    backgroundColor: colors.primary[950],
    borderRadius: 16,
  },
  colContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    borderRadius: 16,
  },
  col: {
    flex: 1,
  },
  colItem: {
    padding: 10,
    height: 45,
    color: colors.accent[500],
    fontFamily: "vazir500",
    fontSize: 16,
  },

  title: {
    fontFamily: "vazir600",
    fontSize: 20,
    color: colors.slateGrey[100],
  },
  borderButtom: {
    borderBottomColor: colors.primary[900],
    borderBottomWidth: 2,
  },
  fontMont: {
    fontFamily: "mont400",
  },
  sumContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.accent[500],
    borderTopLeftRadius: 20,

    alignItems: "center",
  },

  sumNum: {
    fontFamily: "mont500",
    color: colors.primary[950],
    fontSize: 20,
  },
  sumText: {
    color: colors.primary[800],
    fontFamily: "vazir600",
  },
  date: {
    fontFamily: "mont400",
    color: colors.accent[400],
    fontSize: 16,
  },
  dateLabel: {
    paddingTop: 7,
    fontFamily: "vazir600",
    alignItems: "flex-start",
    fontSize: 12,
    color: colors.slateGrey[500],
  },
  dateContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
