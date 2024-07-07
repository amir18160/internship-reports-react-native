// lib
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// components
import RowDetail from "components/common/RowDetail";
import MultilineInput from "components/common/MultilineInput";
import TimePicker from "components/common/TimePicker";
import Button from "components/common/Button";
import Modal from "components/common/Modal";

// const
import colors from "constants/colors";

// hooks
import { useReport } from "hooks/useReport";

// icons
import { AntDesign, FontAwesome } from "@expo/vector-icons";

// types
import { RootBottomTabParamList } from "types/NavigationType";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabScreenProps<RootBottomTabParamList, "home-screen">;
type ModalState = {
  visible: boolean;
  type: "timePicker" | "status" | "";
  frontError?: boolean;
};

export default function AddReport({ navigation }: Props) {
  // hooks

  const [modalVisible, setModalVisible] = useState<ModalState>({
    visible: false,
    type: "",
    frontError: false,
  });
  const [modalMessage, setModalMessage] = useState<string>("");
  const [reportDetails, setReportDetails] = useState({
    description: "",
    link: "",
    duration: "",
  });

  const { data, isError, error, isPending, isSuccess, performMutation } =
    useReport("ADD_REPORT");

  // handers

  function onSetDuration(duration: string) {
    setReportDetails((state) => ({ ...state, duration }));
  }
  function onSetLink(link: string) {
    setReportDetails((state) => ({ ...state, link }));
  }
  function onSetdescription(description: string) {
    setReportDetails((state) => ({ ...state, description }));
  }

  function handleDatePickerModal() {
    setModalVisible({ visible: true, type: "timePicker" });
  }

  function handleCloseModal() {
    setModalVisible({ visible: false, type: "" });
    setModalMessage("");

    if (isSuccess) {
      navigation.goBack();
    }
  }

  function handleConfirm() {
    if (!reportDetails.description) {
      setModalMessage("توضیحات نمیتواند خالی باشد");
      setModalVisible({ type: "status", visible: true, frontError: true });
      return;
    }
    if (!reportDetails.duration) {
      setModalMessage("لطفا مدت زمان را انتخاب کنید.");
      setModalVisible({ type: "status", visible: true, frontError: true });
      return;
    }

    console.info(reportDetails);

    performMutation({ ...reportDetails });
  }

  useEffect(
    function () {
      if (error?.response?.data.message) {
        setModalMessage(error.response.data.message);
        setModalVisible({ type: "status", visible: true });
      } else if (error?.isAxiosError) {
        setModalMessage("مشکل در اتصال!");
        setModalVisible({ type: "status", visible: true });
      } else if (isSuccess) {
        setModalMessage("ثبت موفق آمیز!");
        setModalVisible({ type: "status", visible: true, frontError: false });
      }
    },
    [isSuccess, isError, error],
  );

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
            onChangeText={onSetdescription}
            value={reportDetails.description}
            title="توضیحات"
            placeholder="توضیحات شما در رابطه با فعالیت."
            icon={<FontAwesome name="file-text" size={18} color={colors.accent[500]} />}
          />
          <MultilineInput
            onChangeText={onSetLink}
            value={reportDetails.link}
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
            value={reportDetails.duration}
            button={
              <Button
                buttonContentStyle={styles.contentStyle}
                labelStyle={styles.contentStyle}
                style={styles.hourButton}
                onPress={handleDatePickerModal}
              >
                انتخاب ساعات
              </Button>
            }
          />
        </View>

        <TimePicker
          visible={modalVisible.visible && modalVisible.type === "timePicker"}
          onDismiss={handleCloseModal}
          onConfirm={onSetDuration}
        />

        <Button
          style={styles.confirmButton}
          onPress={handleConfirm}
          isPending={isPending}
        >
          تایید
        </Button>
      </View>
      <Modal
        visible={modalVisible.visible && modalVisible.type === "status"}
        onClose={handleCloseModal}
        title={isError || modalVisible.frontError ? "ناموفق" : "موفق"}
        actionName="باشه"
        contentText={modalMessage}
      />
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
  confirmButton: {
    marginTop: 25,
    marginRight: 25,
  },
});
