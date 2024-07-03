import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "types/NavigationType";

// screens
import Home from "screens/Home";
import History from "screens/History";

// icons
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import colors from "constants/colors";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="home-screen"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "vazir600" },
        headerStyle: {
          backgroundColor: colors.primary[950],
          elevation: 0,
          borderWidth: 0.5,
          borderColor: colors.primary[800],
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
          paddingHorizontal: 10,
          backgroundColor: colors.primary[950],
          elevation: 0,
          borderColor: colors.primary[800],
        },
        headerTintColor: colors.accent[300],
        tabBarActiveBackgroundColor: colors.primary[900],
        tabBarActiveTintColor: colors.accent[500],
        tabBarLabelStyle: { fontSize: 14, borderRadius: 20, padding: 5 },
        tabBarItemStyle: { borderRadius: 16 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="home-screen"
        component={Home}
        options={{
          title: "report mentor by jsu",
          headerTitleStyle: {
            fontFamily: "mont400",
            textTransform: "uppercase",
            fontSize: 20,
            letterSpacing: 3,
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="history-screen"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
