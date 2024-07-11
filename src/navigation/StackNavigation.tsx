// libaries
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import colors from "constants/colors";
import Register from "screens/Register";
import Login from "screens/Login";
import Welcome from "screens/Welcome";
import Support from "screens/Support";
import Report from "screens/Report";
import AddReport from "screens/AddReport";
import EditProfile from "screens/EditProfile";

// icon
import { AntDesign } from "@expo/vector-icons";

// types
import { RootStackParamList } from "types/NavigationType";

// main layout
import BottomNavigation from "./BottomNavigation";
import { useUserStore } from "stores/userStore";

// native stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation(): React.ReactElement {
  const user = useUserStore((state) => state.user);

  let starterScreen: keyof RootStackParamList = "welcome-screen";

  if (user?.id && user.isAdmin) {
    starterScreen = "bottom-navigation";
  } else if (user?.id) {
    starterScreen = "bottom-navigation";
  }

  return (
    <Stack.Navigator
      initialRouteName={starterScreen}
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.primary[950],
        contentStyle: { backgroundColor: colors.primary["900"] },
        headerTintColor: colors.accent[300],
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "vazir700",
        },
        headerStyle: { backgroundColor: colors.primary[950] },
      }}
    >
      <Stack.Screen name="welcome-screen" component={Welcome} />

      <Stack.Screen
        name="login-screen"
        component={Login}
        options={{ animation: "slide_from_left" }}
      />

      <Stack.Screen
        name="register-screen"
        component={Register}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="support-screen"
        component={Support}
        options={{ animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="bottom-navigation"
        component={BottomNavigation}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="report-detail-screen"
        component={Report}
        options={{ animation: "ios", headerShown: true, title: "گزارش" }}
      />

      <Stack.Screen
        name="edit-profile-screen"
        component={EditProfile}
        options={{
          animation: "slide_from_bottom",
          headerShown: true,
          title: "ویرایش پروفایل",
        }}
      />

      <Stack.Screen
        name="add-report-screen"
        component={AddReport}
        options={({ navigation }) => ({
          headerBackVisible: false,
          animation: "slide_from_left",
          headerShown: true,
          title: "افزودن گزارش",
          headerRight: () => (
            <AntDesign
              name="arrowright"
              color={colors.accent[400]}
              size={24}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
