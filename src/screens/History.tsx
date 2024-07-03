import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "constants/colors";

export default function Home() {
  return (
    <View style={styles.root}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary[900],
  },
});
