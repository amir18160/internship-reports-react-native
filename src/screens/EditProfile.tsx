// eslint-disable-next-line react-native/split-platform-components
import { StyleSheet, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";

// components
import Button from "components/common/Button";
import RowDetail from "components/common/RowDetail";
import Input from "components/common/Input";
import CheckBox from "components/common/CheckBox";
import Modal from "components/common/Modal";

// icons
import { FontAwesome5 } from "@expo/vector-icons";

// const
import colors from "constants/colors";

// stores
import { useUserStore } from "stores/userStore";

// custom hooks
import { useUpdateUser } from "hooks/useUser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/NavigationType";

// types
type PersonalInfoType = {
  userId: string;
  firstName: string;
  lastName: string;
  internshipMentor: string;
  workingField: string;
  internStatus: string;
  identificationNumber: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "edit-profile-screen">;

export default function EditProfile({ navigation }: Props) {
  // const
  const internStatus = ["OFFICIAL", "LEARNING"];
  const workingFields = ["MOBILE", "SERVER", "WEB", "UNKNOWN", "OTHER"];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // stores
  const prevUserInfo = useUserStore((state) => state.user)!;

  // query hooks
  const { data, error, isError, isPending, isSuccess, mutate } = useUpdateUser();

  // states
  const [userInfo, setUserInfo] = useState<PersonalInfoType>({
    userId: prevUserInfo?.id,
    firstName: prevUserInfo?.firstName,
    lastName: prevUserInfo?.lastName,
    internStatus: prevUserInfo?.internStatus,
    identificationNumber: prevUserInfo?.identificationNumber,
    internshipMentor: prevUserInfo?.internshipMentor,
    workingField: prevUserInfo?.workingField,
  });

  console.log(userInfo);

  // handler
  const onChangeWorkingField = (value: string) => {
    if (!workingFields.includes(value)) return;

    setUserInfo({ ...userInfo, workingField: value });
  };

  const onChangeInternStatus = (value: string) => {
    if (!internStatus.includes(value)) return;
    setUserInfo({ ...userInfo, internStatus: value });
  };

  const onChangeInputField = (key: string, value: string) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const onCloseModalHandler = () => {
    if (isSuccess) {
      navigation.goBack();
      return;
    }

    setErrorMessage(null);
  };

  const onSubmit = () => {
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.internStatus ||
      !userInfo.identificationNumber ||
      !userInfo.internshipMentor ||
      !userInfo.workingField
    ) {
      if (!userInfo.firstName) setErrorMessage("نام نمی تواند خالی باشد");
      if (!userInfo.lastName) setErrorMessage("نام خانوادگی نمی تواند خالی باشد");
      if (!userInfo.internStatus) setErrorMessage("وضعیت کارآموزی نمی تواند خالی باشد");
      if (!userInfo.identificationNumber)
        setErrorMessage("شماره دانشحویی نمی تواند خالی باشد");
      if (!userInfo.internshipMentor) setErrorMessage("استاد راهنما نمی تواند خالی باشد");
      if (!userInfo.workingField) setErrorMessage("زمینه کاراموزی نمی تواند خالی باشد");
      return;
    }

    mutate({ ...userInfo });
  };

  // effects
  useEffect(
    function () {
      if (isError && error && error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      }
    },
    [isError, error, isSuccess, data],
  );

  // render
  return (
    <ScrollView style={styles.root}>
      <View style={styles.root}>
        <View style={styles.container}>
          <View>
            <RowDetail
              title="اطلاعات شخصی"
              icon={
                <FontAwesome5 name="user-edit" size={18} color={colors.accent[500]} />
              }
            />
            <Input
              label="نام"
              value={userInfo.firstName}
              onSetValue={(value: any) => onChangeInputField("firstName", value)}
            />
            <Input
              label="نام خانوادگی"
              value={userInfo.lastName}
              onSetValue={(value: any) => onChangeInputField("lastName", value)}
            />
            <Input
              label="نام استاد کاراموزی"
              value={userInfo.internshipMentor}
              onSetValue={(value: any) => onChangeInputField("internshipMentor", value)}
            />
            <Input
              label="شماره دانشجویی"
              value={userInfo.identificationNumber}
              onSetValue={(value: any) =>
                onChangeInputField("identificationNumber", value)
              }
            />
          </View>

          <RowDetail
            title="زمینه کاری دانشجو"
            icon={<FontAwesome5 name="mobile-alt" size={18} color={colors.accent[500]} />}
          />
          <CheckBox
            values={workingFields}
            onValueChange={onChangeWorkingField}
            active={userInfo.workingField}
          />

          <RowDetail
            title="وضعیت دانشجو"
            icon={<FontAwesome5 name="mobile-alt" size={18} color={colors.accent[500]} />}
          />
          <CheckBox
            values={internStatus}
            onValueChange={onChangeInternStatus}
            active={userInfo.internStatus}
          />

          <Button
            style={styles.buttonStyles}
            buttonContentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            icon="content-save"
            mode="outlined"
            rippleColor={colors.slateGrey[500]}
            onPress={onSubmit}
            isPending={isPending}
          >
            ذخیره
          </Button>
        </View>
      </View>
      <Modal
        onClose={onCloseModalHandler}
        title={errorMessage ? "خطا" : "موفق"}
        visible={(errorMessage && errorMessage.length > 0) || isSuccess}
        actionName="بستن"
        contentText={errorMessage ? errorMessage : "ویرایش با موفقیت انجام شد."}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
  },
  container: {
    gap: 10,
    maxWidth: 800,
    width: "100%",
    marginHorizontal: "auto",
    padding: 15,
    backgroundColor: colors.primary[900],
  },
  buttonStyles: {
    borderWidth: 1,
    borderColor: colors.primary[800],
  },
  buttonContent: {
    backgroundColor: colors.primary[950],
  },
  buttonLabel: {
    color: colors.accent[400],
  },
});
