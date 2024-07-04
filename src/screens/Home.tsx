// lib
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

// const
import colors from "constants/colors";

// componenta
import { AntDesign } from "@expo/vector-icons";
import ReportItem from "components/common/ReportItem";
import Heading from "components/common/Heading";
import Number from "components/common/Number";

// animation
import Ripple from "components/animations/Ripple";

// navigation
import { useNavigation, NavigationProp } from "@react-navigation/native";

// props
import { RootStackParamList } from "types/NavigationType";

export default function Home() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  function onGoToReportHandler() {
    navigate("report-detail-screen");
  }

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.weekReportsContainer}>
          <Heading>گزارشات این هفته</Heading>
          <View>
            <View style={styles.reportsGrid}>
              {Array(5)
                .fill(1)
                .map(() => (
                  <ReportItem
                    key={Math.random()}
                    day="سه شنبه"
                    hours="16"
                    date="1394/13/41"
                    onPress={onGoToReportHandler}
                  />
                ))}

              <View style={styles.addNewContainer}>
                <TouchableRipple
                  borderless
                  style={styles.addNewContainer}
                  rippleColor={colors.accent[300]}
                  onPress={() => navigate("add-report-screen")}
                >
                  <View style={styles.addNewButton}>
                    <AntDesign name="pluscircle" size={28} color={colors.accent[950]} />
                    <Text style={styles.addButtonText}>اضافه کردن</Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>

            <View>
              <Heading>وضعیت هفته کنونی</Heading>
              <View style={styles.statusContainer}>
                <Heading style={styles.weekStatusTitle}>انجام شده</Heading>
                <Heading style={styles.timeLeft}>باقیمانده</Heading>
              </View>
              <View style={styles.statusContainer}>
                <Heading style={styles.weekStatusTitle}>
                  <Number size={18}>12</Number>
                </Heading>
                <Heading style={styles.timeLeft}>
                  <Number size={18}>8</Number>
                </Heading>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary[900],
    padding: 10,
  },
  weekReportsContainer: {
    backgroundColor: colors.primary[950],
    borderRadius: 20,
    padding: 10,
  },
  reportsGrid: {
    marginTop: 30,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 30,
  },
  addNewContainer: {
    backgroundColor: colors.accent[600],
    borderRadius: 16,
    flex: 1,
  },
  addNewButton: {
    display: "flex",
    flexDirection: "row-reverse",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  addButtonText: {
    fontFamily: "vazir600",
    fontSize: 16,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: 8,
    gap: 10,
  },
  weekStatusTitle: {
    fontSize: 16,
    backgroundColor: colors.slateGrey[700],
    color: colors.accent[200],
  },
  timeLeft: {
    fontSize: 16,
    backgroundColor: colors.red[900],
    color: colors.white,
  },
});
