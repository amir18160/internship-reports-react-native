import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "constants/colors";
import TwoColGrid from "components/common/TwoColGrid";

import { FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const userInfo = [
  [
    {
      subtitle: "نام",
      textContent: "امیر حسین حوری",
      icon: <FontAwesome name="user-circle" color={colors.slateGrey[500]} size={12} />,
    },
    {
      subtitle: "نوع کاربر",
      textContent: "دانشجو",
      icon: <MaterialIcons name="engineering" size={14} color={colors.slateGrey[500]} />,
    },
  ],
  [
    {
      subtitle: "زمینه کاراموزی",
      textContent: "موبایل",
      icon: <FontAwesome name="mobile" size={18} color={colors.slateGrey[500]} />,
    },
    {
      subtitle: "استاد راهنما",
      textContent: "استاد موسی زاده",
      icon: (
        <FontAwesome5 name="chalkboard-teacher" size={12} color={colors.slateGrey[500]} />
      ),
    },
  ],
];

const userActivityData = [
  [
    { subtitle: "فعالیت هفته", textContent: "16" },
    { subtitle: "فعالیت هفته قبل", textContent: "43" },
  ],
  [
    { subtitle: "فعالیت ماه قبل", textContent: "91" },
    { subtitle: "فعالیت کل", textContent: "392" },
  ],
];

const userInternInfo = [
  [
    { subtitle: "نوع کارآموز", textContent: "رسمی" },
    { subtitle: "مدال فعالیت", textContent: "الماس" },
  ],
];

export default function Profile() {
  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <Text style={styles.headingStyles}>اطلاعات شخصی</Text>
          <TwoColGrid data={userInfo} />
        </View>

        <View>
          <Text style={styles.headingStyles}>آمار فعالیت ها</Text>
          <TwoColGrid data={userActivityData} />
        </View>

        <View>
          <Text style={styles.headingStyles}>وضعیت کارآموز</Text>
          <TwoColGrid data={userInternInfo} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary[900],
    maxWidth: 800,
  },
  headingStyles: {
    padding: 0,
    borderRadius: 0,
    borderColor: colors.slateGrey[700],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontFamily: "vazir500",
    color: colors.accent[600],
    textAlign: "center",
    backgroundColor: colors.primary[950],
    paddingVertical: 20,
    fontSize: 24,
  },
});
