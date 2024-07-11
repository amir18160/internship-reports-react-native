import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// component
import Heading from "components/common/Heading";
import RowDetail from "components/common/RowDetail";

//const
import colors from "constants/colors";

// icons
import { FontAwesome, AntDesign } from "@expo/vector-icons";

// utils
import openLinkInBrowser from "utils/openLinkInBrowser";
import { convertIsoToPersianDate } from "utils/dateTime";
import { sumTimeStrings } from "utils/calculateSum";

// types
import { RootStackParamList } from "types/NavigationType";

type Props = BottomTabScreenProps<RootStackParamList, "report-detail-screen">;

export default function Report({ route }: Props) {
  const { report } = route.params;
  const reportDateAndTime = convertIsoToPersianDate(report.date);
  const duration = sumTimeStrings([report.duration]);

  report.duration.split(":");
  return (
    <ScrollView>
      <View style={styles.root}>
        <Heading style={styles.heading}>
          <Text>جزئیات گزارش</Text>
        </Heading>

        <View style={styles.mb}>
          <RowDetail
            title="تاریخ گزارش"
            unit={reportDateAndTime.dayOfWeek}
            value={reportDateAndTime.dateString}
            icon={<FontAwesome name="calendar" size={18} color={colors.accent[500]} />}
          />
        </View>
        <RowDetail
          title="ساعات بازدهی"
          unit="H"
          value={duration}
          icon={<AntDesign name="clockcircle" size={18} color={colors.accent[500]} />}
        />

        <View style={styles.descriptionContainer}>
          <View style={styles.flex}>
            <FontAwesome name="text-height" size={18} color={colors.accent[500]} />
            <Text style={styles.descriptionTitle}>توضیحات:</Text>
          </View>
          <Text style={styles.descriptionContent}>{report.description}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.flex}>
            <FontAwesome name="link" size={18} color={colors.accent[500]} />
            <Text style={styles.descriptionTitle}>لینک پیوست شده: </Text>
          </View>
          <View>
            <TouchableRipple
              borderless
              style={styles.linkContainer}
              rippleColor={colors.accent[200]}
              onPress={() => openLinkInBrowser(report.link)}
            >
              <Text style={styles.link}>
                {report.link ? report.link : "لینک پیوست نشده"}
              </Text>
            </TouchableRipple>
          </View>
          <Text style={styles.descriptionContent}></Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    maxWidth: 700,
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: 10,
    backgroundColor: colors.primary[950],
    borderRadius: 16,
  },
  heading: {
    marginBottom: 30,
  },

  descriptionContainer: {
    marginTop: 30,
    paddingVertical: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: "vazir500",
    color: colors.accent[500],
  },

  descriptionContent: {
    fontFamily: "vazir500",
    color: colors.accent[400],
    fontSize: 16,
    marginTop: 10,
    paddingRight: 30,
  },
  flex: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    flexDirection: "row-reverse",
  },
  linkContainer: {
    marginTop: 10,
    marginRight: 30,
    backgroundColor: colors.primary[900],
    borderRadius: 10,
  },
  link: {
    padding: 12,
    fontSize: 14,
    lineHeight: 25,
    color: colors.accent[300],
    fontFamily: "mont400",
  },
  mb: {
    marginBottom: 15,
  },
});
