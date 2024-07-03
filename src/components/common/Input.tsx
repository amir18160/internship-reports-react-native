/* eslint-disable react-native/no-inline-styles */

import { View, StyleSheet, Text, TextInput } from "react-native";
import { HelperText } from "react-native-paper";
import colors from "constants/colors";

type Props = {
  label: string;
  value: string;
  onSetValue?: any;
  helperText?: string;
  decimal?: boolean;
  labelStyle?: object;
  containerStyles?: object;
  inputStyle?: object;
  helperStyle?: object;
};

export default function Input({
  label,
  helperText,
  containerStyles,
  helperStyle,
  inputStyle,
  decimal,
  onSetValue,
  value,
}: Props) {
  // const [value, setValue] = useState<string>("");

  // const hasErrors = () => {
  //   return !value.includes("@");
  // };

  return (
    <View style={containerStyles}>
      <View style={styles.inputLabelContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={[styles.inputStyles, inputStyle]}>
          <TextInput
            style={styles.innerInput}
            keyboardType={decimal ? "decimal-pad" : "default"}
            value={value}
            onChangeText={onSetValue}
            placeholder={label}
          />
        </View>
      </View>
      {/* <HelperText style={helperStyle} type="error" visible={hasErrors()}>
        {helperText}
      </HelperText> */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabelContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  inputStyles: {
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: colors.accent[100],
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  labelContainer: {
    height: 55,
    width: "auto",
    verticalAlign: "middle",
    backgroundColor: colors.accent[500],
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
    minWidth: 110,
  },
  innerInput: {
    padding: 5,
    paddingHorizontal: 10,
    textAlign: "right",
    direction: "rtl",
    fontSize: 16,
    fontFamily: "vazir400",
    width: "100%",
  },
  label: {
    fontFamily: "vazir500",
    fontSize: 16,
    color: colors.primary[900],
  },
});
