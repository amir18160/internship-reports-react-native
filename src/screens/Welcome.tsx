import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "constants/colors";
import { Button } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "types/NavigationType";

export default function Welcome() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>سلام, خوش اومدید.</Text>
      <Image source={require("assets/images/boy_laptop.png")} style={styles.imageStyle} />
      <View style={styles.buttonContainer}>
        <Button
          icon="pencil"
          mode="contained"
          rippleColor={colors.accent["200"]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
          onPress={() => navigate("login-screen")}
        >
          ورود
        </Button>
        <Button
          icon="login-variant"
          rippleColor={colors.accent["200"]}
          mode="contained"
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
          onPress={() => navigate("register-screen")}
        >
          ثبت نام
        </Button>
      </View>
      <Button
        icon="phone"
        mode="outlined"
        rippleColor={colors.accent[200]}
        style={styles.outlineButton}
        contentStyle={styles.outlineButtonContent}
        labelStyle={[styles.buttonText, styles.outlineButtonText]}
        onPress={() => navigate("support-screen")}
      >
        تماس با مدیریت
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    alignItems: "center", // Center items horizontally
  },
  heading: {
    fontSize: 40,
    color: colors.accent["300"],
    fontFamily: "vazir300",
    textAlign: "center", // Center text horizontally
  },
  imageStyle: {
    marginTop: 20,
    width: "90%",
    height: "40%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "90%",
  },
  buttonContent: {
    flexDirection: "row-reverse",
    height: 50,
    minWidth: 150,
    backgroundColor: colors.accent[600],
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "vazir400",
    padding: 5,
    marginBottom: 3,
    color: colors.white,
  },
  outlineButton: {
    width: "90%",
    height: 50,
    marginTop: 15,
  },
  outlineButtonContent: {
    height: "100%",
    flexDirection: "row-reverse",
  },
  outlineButtonText: {
    color: colors.accent[400],
  },
});
