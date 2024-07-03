import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import {} from "react-native-paper";
import colors from "constants/colors";

// icons
import { Entypo } from "@expo/vector-icons";

export default function Support() {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.heading}>پشتیانی</Text>
        <Image source={require("assets/images/support.png")} style={styles.imageStyles} />
        <View style={styles.descriptionContainer}>
          <Entypo name="phone" size={30} color={colors.accent[500]} style={styles.icon} />
          <Text style={styles.descriptionText}>
            در صورت وجود مشکل میتوانید از طریق زیر با مدیر سامانه در ارتباط باشید.
          </Text>
        </View>

        <View style={styles.seperator} />

        <View style={styles.infoContainer}>
          <Text style={styles.contactLabel}>شماره تماس</Text>
          <Text style={styles.contactValue}>0916 034 2344</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.contactLabel}>تلگرام</Text>
          <Text style={styles.contactValue}>@AmirHoori</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.contactLabel}>JSU</Text>
          <Text style={styles.contactValue}>امیر حسین حوری</Text>
        </View>

        <View style={[styles.infoContainer, { backgroundColor: colors.red[500] }]}>
          <Text style={styles.contactValue}>اطلاعات بالا صحیح نیست!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 900,
    width: "90%",
    marginHorizontal: "auto",
  },
  heading: {
    fontFamily: "vazir400",
    fontSize: 30,
    marginTop: 50,
    marginHorizontal: "auto",
    color: colors.accent[400],
    borderBottomWidth: 1,
    borderBottomColor: colors.accent[400],
    marginBottom: 10,
  },
  imageStyles: {
    width: 350,
    height: 330,
    resizeMode: "center",
    marginHorizontal: "auto",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 10,
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: colors.accent[300],
    fontFamily: "vazir300",
  },
  icon: {
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 500,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.accent[200],
  },
  seperator: {
    maxWidth: 300,
    width: "100%",
    backgroundColor: colors.accent[300],
    height: 1,
    borderRadius: 2,
  },
  contactLabel: {
    fontFamily: "vazir600",
    color: colors.primary[950],
    fontSize: 16,
  },
  contactValue: {
    color: colors.primary[950],
    fontSize: 16,
    fontFamily: "vazir700",
  },
});
