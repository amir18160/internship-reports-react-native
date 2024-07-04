/* eslint-disable react-native/no-inline-styles */

import React from "react";
import { StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import { TouchableRipple } from "react-native-paper";
import colors from "constants/colors";

interface ReportItemProps {
  day: string;
  hours: string;
  date?: string;
  isItDate?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

export default function ReportItem({
  day,
  hours,
  date,
  onPress,
  isItDate,
}: ReportItemProps): React.ReactElement {
  return (
    <TouchableRipple
      borderless
      rippleColor={colors.accent[200]}
      onPress={onPress}
      style={styles.reportContainer}
    >
      <>
        <View style={styles.dateContainer}>
          <Text style={[styles.reportDay, isItDate && { fontFamily: "mont400" }]}>
            {day}
          </Text>

          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.reportWorkingHoursContainer}>
          <Text style={styles.hour}>ساعت</Text>
          <Text style={styles.reportWorkingHours}>{hours}</Text>
        </View>
      </>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  reportContainer: {
    padding: 15,
    borderRadius: 16,
    width: "48.5%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.accent[500],
  },
  reportDay: {
    fontFamily: "vazir600",
    fontSize: 18,
    backgroundColor: colors.accent[600],
    padding: 5,
    borderRadius: 12,
    minWidth: 50,
    textAlign: "center",
  },
  reportWorkingHoursContainer: {
    display: "flex",
    gap: 2,
    flexDirection: "row",
  },
  reportWorkingHours: {
    fontFamily: "mont400",
    fontSize: 24,
    alignSelf: "flex-start",
  },
  hour: {
    fontSize: 12,
    fontFamily: "vazir500",
    alignSelf: "flex-end",
  },
  date: {
    fontSize: 10,
    fontFamily: "mont300",
    position: "absolute",
    right: 0,
    top: 36,
  },
  dateContainer: {
    position: "relative",
  },
});
