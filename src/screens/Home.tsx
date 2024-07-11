// lib
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

// const
import colors from "constants/colors";

// componenta
import { AntDesign } from "@expo/vector-icons";
import ReportItem from "components/common/ReportItem";
import Heading from "components/common/Heading";
import Number from "components/common/Number";

// navigation
import { useNavigation, NavigationProp, useIsFocused } from "@react-navigation/native";

// props
import { RootStackParamList } from "types/NavigationType";

// hooks
import { useReport } from "hooks/useReport";

// utils
import { convertIsoToPersianDate, getCurrentWeekRange } from "utils/dateTime";
import { sumTimeStrings, calculateDistanceFrom20 } from "utils/calculateSum";
import { isTodaysReportAlreadyExist } from "utils/reportExistCheck";

// types
import { ReportType } from "types/ReportType";

export default function Home() {
  // hooks
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [todayReport, setTodayReport] = useState<ReportType | null>(null);
  const isFocused = useIsFocused();
  const { isError, performMutation, data } = useReport("QUERY_REPORT");
  const [duration, setDuration] = useState({
    sum: "00:00",
    distance: "00:00",
    below20: false,
  });

  // const
  const currentWeekRange = getCurrentWeekRange();

  // effects
  useEffect(
    function () {
      if (!isFocused) return;

      performMutation({
        dateGreaterThen: currentWeekRange[0],
        dateLessThen: currentWeekRange[1],
      });
    },
    [isFocused],
  );

  useEffect(
    function () {
      if (!data || data.reports?.length === 0) return;
      const arrOfDurations = data.reports.map((_data: any) => _data.duration);
      const sum = sumTimeStrings(arrOfDurations);
      const distance = calculateDistanceFrom20(sum);
      setDuration({ sum, distance: distance.distance, below20: distance.below20 });

      setTodayReport(isTodaysReportAlreadyExist(data.reports)[1]);
    },
    [data],
  );

  // handlers
  function onGoToReportHandler(report: ReportType) {
    navigate("report-detail-screen", { report });
  }

  function onAddNewReportHandler() {
    navigate("add-report-screen", todayReport ? { todaysReport: todayReport } : {});
  }

  // render
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.weekReportsContainer}>
          <Heading>گزارشات این هفته</Heading>
          <View>
            <View style={styles.reportsGrid}>
              {data ? (
                data.reports?.map((_data: any, index: number) => (
                  <ReportItem
                    key={_data + Math.random() + index}
                    day={convertIsoToPersianDate(_data.date).dayOfWeek}
                    hours={_data.duration}
                    date={convertIsoToPersianDate(_data.date).dateString}
                    onPress={() => onGoToReportHandler(_data)}
                  />
                ))
              ) : (
                <View>
                  <Heading>{isError ? "خطا در بارگذاری" : "در حال بارگذاری"}</Heading>
                </View>
              )}

              <View style={styles.addNewContainer}>
                <TouchableRipple
                  borderless
                  style={styles.addNewContainer}
                  rippleColor={colors.accent[300]}
                  onPress={onAddNewReportHandler}
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
                <Heading
                  style={duration.below20 ? styles.timeLeft : styles.additionalTime}
                >
                  {duration.below20 ? "باقیمانده" : "اضافه کاری"}
                </Heading>
              </View>
              <View style={styles.statusContainer}>
                <Heading style={styles.weekStatusTitle}>
                  <Number size={18}>{duration.sum.split(":")[0]}</Number>
                </Heading>
                <Heading
                  style={duration.below20 ? styles.timeLeft : styles.additionalTime}
                >
                  <Number size={18}>{duration.distance.split(":")[0]}</Number>
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
    minHeight: 65,
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
  additionalTime: {
    fontSize: 16,
    backgroundColor: colors.emerald[900],
    color: colors.white,
  },
});
function isTodysReportAlreadyExist(reports: any): any {
  throw new Error("Function not implemented.");
}
