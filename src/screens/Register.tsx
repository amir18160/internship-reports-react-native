// lib
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

// const
import colors from "constants/colors";

// components
import Input from "components/common/Input";
import Modal from "components/common/Modal";
import Button from "components/common/Button";
import useRegister from "hooks/useRegister";

// types
import { RegisterType } from "types/RegisterType";

export default function Register() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [formData, setFormData] = useState<RegisterType>({
    identificationNumber: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const onInputChange = (name: keyof RegisterType, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // TODO: We MUST store register data in localstorage in useRegister (if it was successfull)
  const { data, error, isPending, isSuccess, register, isError } = useRegister(formData);

  function onSubmitHandler() {
    register();
  }

  useEffect(
    function () {
      if (isError) {
        console.log("error");
        console.log(error?.message);
      }
      if (isPending) {
        console.log("Pending");
      }
      if (isSuccess) {
        console.log("Success");
      }
    },
    [isError, isSuccess, isPending],
  );

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.heading}>ثبت نام کنید!</Text>
        <Image source={require("assets/images/sign_up.png")} style={styles.imageStyles} />

        <Input
          label="نام"
          value={formData.firstName}
          onSetValue={(text: string) => onInputChange("firstName", text)}
        />
        <Input
          label="نام خانوادگی"
          value={formData.lastName}
          onSetValue={(text: string) => onInputChange("lastName", text)}
        />
        <Input
          label="شماره دانشجویی"
          decimal
          value={formData.identificationNumber}
          onSetValue={(text: string) => onInputChange("identificationNumber", text)}
        />
        <Input
          label="رمز عبور"
          decimal
          value={formData.password}
          onSetValue={(text: string) => onInputChange("password", text)}
        />

        <View style={styles.formContainer}>
          <Button
            icon="login-variant"
            onPress={onSubmitHandler}
            label="ثبت نام"
            isPending={isPending}
          ></Button>
        </View>
      </View>

      {isModalActive && (
        <Modal
          actionName="باشه"
          contentText="مشکلی وجودا داره"
          onClose={setIsModalActive}
          title="ارور"
          visible={isModalActive}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 700,
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 30,
    marginBottom: 50,
  },
  heading: {
    fontSize: 34,
    fontFamily: "vazir500",
    color: colors.accent[400],
    marginHorizontal: "auto",
    marginTop: 50,
  },
  imageStyles: {
    maxWidth: "100%",
    height: 360,
    resizeMode: "center",
  },
  formContainer: {
    marginTop: 5,
  },
});
