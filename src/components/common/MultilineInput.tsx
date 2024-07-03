import React, { ReactNode } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import RowDetail from "./RowDetail";
import colors from "constants/colors";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  title: string;
  icon: ReactNode;
  placeholder: string;
  height: number;
};

export default function MultilineInput({ title, icon, placeholder, height }: Props) {
  return (
    <View>
      <View style={styles.mb_md}>
        <RowDetail
          title="توضیحات"
          icon={<FontAwesome name="file-text" size={18} color={colors.accent[500]} />}
        />
      </View>
      <TextInput
        placeholderTextColor={colors.accent[300]}
        style={styles.multilineInput}
        placeholder="توضیحات شما..."
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  multilineInput: {
    backgroundColor: colors.primary[900],
    padding: 20,
    height: 200,
    verticalAlign: "top",
    color: colors.accent[400],
    fontSize: 18,
    fontFamily: "vazir500",
    textAlign: "right",
    textAlignVertical: "top",
    borderRadius: 16,
    marginRight: 25,
  },
  mb_md: {
    marginBottom: 15,
  },
});
