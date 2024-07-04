import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import React, { useEffect, useReducer } from "react";

import { useNavigation, NavigationProp } from "@react-navigation/native";

// constants
import colors from "constants/colors";

// components
import Input from "components/common/Input";
import Button from "components/common/Button";
import Modal from "components/common/Modal";

// hook
import useLogin from "hooks/useLogin";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// types
import { RootStackParamList } from "types/NavigationType";

interface ModelInterface {
  title: string;
  contentText?: string;
  actionName?: string;
}

interface State {
  idNumber: string;
  password: string;
  showModal: boolean;
  modalProps: ModelInterface;
}

type Action =
  | { type: "SET_ID_NUMBER"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SHOW_MODAL"; payload: ModelInterface }
  | { type: "HIDE_MODAL" };

const initialState: State = {
  idNumber: "",
  password: "",
  showModal: false,
  modalProps: {
    title: "",
    contentText: "",
    actionName: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ID_NUMBER":
      return { ...state, idNumber: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SHOW_MODAL":
      return { ...state, showModal: true, modalProps: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { idNumber, password, showModal, modalProps } = state;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { login, isPending, isSuccess, isError, error } = useLogin({
    identificationNumber: idNumber,
    password,
  });

  useEffect(
    function () {
      if (isSuccess) navigation.navigate("bottom-navigation");
    },
    [isSuccess, navigation],
  );

  useEffect(
    function () {
      if (isError) {
        dispatch({
          type: "SHOW_MODAL",
          payload: {
            title: "ناموفق",
            contentText: error?.response?.data.message,
            actionName: "باشه فهمیدم",
          },
        });
      }
    },
    [isError, error],
  );

  function onSubmitHandler() {
    if (idNumber.length === 0 || password.length === 0) {
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "هیچ یک از فیلد ها نمیتواند خالی باشد",
          actionName: "باشه فهمیدم",
        },
      });
      return;
    }

    if (!idNumber.match(/^\d+$/)) {
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "شماره دانشجویی نامعتبر است",
          actionName: "باشه فهمیدم",
        },
      });
      return;
    }

    if (!password.match(/^\d+$/)) {
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "پسورد  نامعتبر است",
          actionName: "باشه فهمیدم",
        },
      });
      return;
    }

    login();
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons
            name="login-variant"
            size={24}
            color={colors.accent[500]}
          />
          <Text style={styles.heading}>وارد شوید</Text>
        </View>
        <Image source={require("assets/images/login.png")} style={styles.imageStyles} />
        <Input
          label="شماره دانشجویی"
          decimal
          value={idNumber}
          onSetValue={(text: string) =>
            dispatch({ type: "SET_ID_NUMBER", payload: text })
          }
        />
        <Input
          label="رمز عبور"
          decimal
          value={password}
          onSetValue={(text: string) => dispatch({ type: "SET_PASSWORD", payload: text })}
        />
        <Button
          label="ورود"
          style={styles.ButtonStyle}
          onPress={onSubmitHandler}
          isPending={isPending}
        />
      </View>

      <Modal
        {...modalProps}
        visible={showModal}
        onClose={() => dispatch({ type: "HIDE_MODAL" })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 800,
    width: "90%",
    marginHorizontal: "auto",
  },
  headingContainer: {
    marginTop: 50,
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.primary[800],
    justifyContent: "center",
    width: "100%",
    padding: 20,
    borderRadius: 20,
  },
  heading: {
    fontFamily: "vazir600",
    fontSize: 30,
    color: colors.accent[300],
    textAlign: "center",
  },
  imageStyles: {
    width: "100%",
    height: 410,
    marginHorizontal: "auto",
  },
  ButtonStyle: {
    marginTop: 8,
  },
});
