// lib
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// cont
import colors from "constants/colors";

// component
import TwoColGrid from "components/common/TwoColGrid";

// icons
import { FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

// store
import { useUserStore } from "stores/userStore";

// types
import { RootBottomTabParamList, RootStackParamList } from "types/NavigationType";

type Props = BottomTabScreenProps<RootStackParamList, "edit-profile-screen">;

// initial data
const initialUserInfo = [
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

export default function Profile({ navigation }: Props) {
  const userState = useUserStore((state) => state.user);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userState) {
      setUserInfo((prevUserInfo) => [
        [
          {
            ...prevUserInfo[0][0],
            textContent: `${userState?.firstName} ${userState?.lastName}`,
          },
          {
            ...prevUserInfo[0][1],
            textContent: `${userState?.isAdmin ? "مدیر" : "کاراموز"}`,
          },
        ],
        [
          {
            ...prevUserInfo[1][0],
            textContent: `${userState?.workingField}`,
          },
          {
            ...prevUserInfo[1][1],
            textContent: `${userState?.internshipMentor}`,
          },
        ],
      ]);
    }
  }, [userState, isFocused]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.root}>
        <View style={styles.gridContainer}>
          <View>
            <Text style={styles.headingStyles}>اطلاعات شخصی</Text>
            <Button
              style={styles.buttonStyles}
              labelStyle={styles.buttonLabelStyle}
              rippleColor={colors.slateGrey[400]}
              onPress={() => navigation.navigate("edit-profile-screen")}
            >
              ویرایش
            </Button>
          </View>
          <TwoColGrid data={userInfo} />
        </View>

        <View style={styles.gridContainer}>
          <Text style={styles.headingStyles}>آمار فعالیت ها</Text>
          <TwoColGrid data={userActivityData} />
        </View>

        {/* <View>
          <Text style={styles.headingStyles}>وضعیت کارآموز</Text>
          <TwoColGrid data={userInternInfo} />
        </View> */}
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
    borderRadius: 16,
    borderColor: colors.slateGrey[700],
    backgroundColor: colors.primary[950],
    borderBottomWidth: 1,
    fontFamily: "vazir500",
    color: colors.accent[600],
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 24,
    position: "relative",
  },
  gridContainer: {
    backgroundColor: colors.primary[950],
    padding: 15,
    paddingVertical: 0,
    margin: 10,
    borderRadius: 16,
  },

  buttonStyles: {
    position: "absolute",
    left: 0,
    top: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary[800],
  },

  buttonLabelStyle: {
    fontSize: 14,
    fontFamily: "vazir500",
    color: colors.slateGrey[600],
  },
});
