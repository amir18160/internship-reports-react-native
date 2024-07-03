// lib
import React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";

// components
import RowDetail from "components/common/RowDetail";
import MultilineInput from "components/common/MultilineInput";

// const
import colors from "constants/colors";

// icons
import { AntDesign } from "@expo/vector-icons";

export default function AddReport() {
  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.titleContainer}>
          <RowDetail
            title="گزارش جدید"
            icon={<AntDesign name="pluscircle" size={18} color={colors.accent[500]} />}
            value="1402/03/43"
            unit="شنبه"
          />
        </View>
        <MultilineInput />
        <MultilineInput />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 800,
    width: "95%",
    padding: 15,
    marginTop: 20,
    marginHorizontal: "auto",
    borderRadius: 16,
    backgroundColor: colors.primary[950],
  },

  titleContainer: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomColor: colors.primary[900],
    borderBottomWidth: 2,
  },
});
