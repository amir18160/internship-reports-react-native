import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import colors from "constants/colors";

type InputType = Array<
  Array<{ subtitle?: string; textContent: string; icon?: ReactElement }>
>;

type Props = {
  data: InputType;
};

export default function TwoColGrid({ data }: Props) {
  return (
    <View style={styles.userInfoGridContainer}>
      {data.map((_data, rowIndex) => {
        return (
          <View key={Math.random() + Math.random()}>
            <View
              style={[styles.row, rowIndex !== data.length - 1 && styles.borderBottom]}
            >
              {_data.map((data2: any, colIndex) => (
                <View
                  style={[styles.rowItem, colIndex === 0 && styles.borderLeft]}
                  key={Math.random()}
                >
                  <View style={styles.subtitleContainer}>
                    {data2.icon}
                    <Text style={styles.subtitle}>{data2.subtitle}</Text>
                  </View>
                  <Text style={styles.userInfoText}>{data2.textContent}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoGridContainer: {
    backgroundColor: colors.primary[950],
    gap: 2,
  },

  row: {
    gap: 2,
    flexDirection: "row-reverse",
    height: 100,
  },

  rowItem: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  subtitleContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    flexDirection: "row-reverse",
    gap: 5,
    alignItems: "center",
  },

  subtitle: {
    fontFamily: "vazir300",
    fontSize: 12,
    color: colors.slateGrey[500],
  },

  userInfoText: {
    fontFamily: "vazir300",
    fontSize: 18,
    color: colors.accent[500],
  },
  borderLeft: {
    borderLeftColor: colors.slateGrey[700],
    borderLeftWidth: 1,
  },
  borderBottom: {
    borderBottomColor: colors.slateGrey[700],
    borderBottomWidth: 1,
  },
});
