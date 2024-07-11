/* eslint-disable react-native/no-inline-styles */

// lib
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

// component
import Input from "./Input";
import Button from "./Button";
import colors from "constants/colors";

// utils
import correctTimeInput from "utils/correctTimeInput";

interface TimePickerProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (hour: string) => void;
}

function TimePicker(props: TimePickerProps) {
  const [hour, setHour] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  let converted = "";

  function handleConfirm() {
    try {
      converted = correctTimeInput(hour);
    } catch (err) {
      setIsError(true);
      return;
    }
    props.onConfirm(converted);
    setIsError(false);
    setHour("");
    props.onDismiss();
  }

  function dismisHandler() {
    setIsError(false);
    props.onDismiss();
  }

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={dismisHandler}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.modalTitle}>Select Hour</Text>
        <View style={styles.input}>
          <Input label="تعداد ساعات" value={hour} onSetValue={setHour} decimal={true} />
        </View>

        <View style={styles.helperContainer}>
          <Text style={[styles.helperText, isError ? { opacity: 1 } : {}]}>
            ساعت وارد شده نامعتبر است!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleConfirm}
            buttonContentStyle={styles.buttonContentStyle}
          >
            تایید
          </Button>
          <Button
            mode="contained"
            onPress={dismisHandler}
            buttonContentStyle={styles.buttonContentStyle}
          >
            کنسل
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.accent[50],
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContentStyle: {
    height: 50,
  },
  helperContainer: {
    marginBottom: 20,
  },
  helperText: {
    fontFamily: "vazir500",
    fontSize: 16,
    opacity: 0,
    marginRight: 15,
    color: colors.red[700],
  },
});

export default TimePicker;
