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
import { RootBottomTabParamList } from "types/NavigationType";

type Props = BottomTabScreenProps<RootBottomTabParamList, "home-screen">;

export default function Report({ route }: Props) {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Heading style={styles.heading}>
          <Text>جزئیات گزارش</Text>
        </Heading>

        <View style={styles.mb}>
          <RowDetail
            title="تاریخ گزارش"
            unit="شنبه"
            value="1402/03/11"
            icon={<FontAwesome name="calendar" size={18} color={colors.accent[500]} />}
          />
        </View>
        <RowDetail
          title="ساعات بازدهی"
          unit="H"
          value="12"
          icon={<AntDesign name="clockcircle" size={18} color={colors.accent[500]} />}
        />

        <View style={styles.descriptionContainer}>
          <View style={styles.flex}>
            <FontAwesome name="text-height" size={18} color={colors.accent[500]} />
            <Text style={styles.descriptionTitle}>توضیحات:</Text>
          </View>
          <Text style={styles.descriptionContent}>
            مک‌دانل ایکس‌اف-۸۵ گابلین (به انگلیسی: McDonnell XF-85 Goblin) یک هواپیمای
            جنگنده پیش‌نمونه بود که شرکت مک‌دانل در خلال جنگ جهانی دوم طراحی و تولید
            آزمایشی کرد. این هواپیما برای رهاسازی از دریچه بمب هواپیماهای بمب‌افکن کانویر
            بی-۳۶ به عنوان یک هواپیمای انگل[الف] طراحی شده بود.
          </Text>
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
              onPress={() => openLinkInBrowser("https://www.google.com")}
            >
              <Text style={styles.link}>
                https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser
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
