// lib
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// components
import RowDetail from "components/common/RowDetail";
import MultilineInput from "components/common/MultilineInput";
import TimePicker from "components/common/TimePicker";
import Button from "components/common/Button";

// const
import colors from "constants/colors";

// icons
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function AddReport() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string>("");

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleConfirm(hour: string) {
    setSelectedHour(hour);
  }

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
        <View style={styles.inputsContainer}>
          <MultilineInput
            title="توضیحات"
            placeholder="توضیحات شما در رابطه با فعالیت."
            icon={<FontAwesome name="file-text" size={18} color={colors.accent[500]} />}
          />
          <MultilineInput
            title="لینک"
            placeholder="در صورتی که روی یک تمرین یا پروژه کار کرده اید میتواند لینک آن را اینجا وارد کنید. پر کردن این فیلد ضروری نیست."
            icon={<FontAwesome name="link" size={18} color={colors.accent[500]} />}
            height={120}
          />
        </View>

        <View style={styles.hourPickerContainer}>
          <RowDetail
            title="انتخاب"
            icon={<AntDesign name="clockcircle" size={18} color={colors.accent[500]} />}
            value={selectedHour}
            button={
              <Button
                buttonContentStyle={styles.contentStyle}
                labelStyle={styles.contentStyle}
                style={styles.hourButton}
                onPress={handleOpenModal}
              >
                انتخاب ساعات
              </Button>
            }
          />
        </View>

        <TimePicker
          visible={modalVisible}
          onDismiss={handleCloseModal}
          onConfirm={handleConfirm}
        />
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
  inputsContainer: {
    gap: 25,
  },

  hourButton: {
    width: 100,
    // marginTop: 20,
    marginRight: 25,
    fontSize: 10,
    borderRadius: 8,
  },
  hourPickerContainer: {
    marginTop: 30,
  },
  contentStyle: {
    fontSize: 16,
    padding: 0,
    minWidth: 103,
    height: 35,
    paddingTop: 5,
    color: colors.accent[950],
  },
});
