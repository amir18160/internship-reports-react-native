/* eslint-disable react-native/no-inline-styles */

import React from "react";
import { StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import { TouchableRipple } from "react-native-paper";
import colors from "constants/colors";
import { MotiView } from "moti";

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
    <MotiView style={styles.reportContainer}>
      <TouchableRipple
        borderless
        rippleColor={colors.accent[200]}
        onPress={onPress}
        style={styles.ripple}
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
    </MotiView>
  );
}

const styles = StyleSheet.create({
  reportContainer: {
    borderRadius: 16,
    backgroundColor: colors.accent[500],
    width: "48.5%",
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
  ripple: {
    borderRadius: 16,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 15,
    paddingHorizontal: 10,
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
    right: 5,
    top: 34,
  },
  dateContainer: {
    position: "relative",
  },
});
