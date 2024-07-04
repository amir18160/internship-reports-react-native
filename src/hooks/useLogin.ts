import { useMutation } from "@tanstack/react-query";
import { login as loginFn } from "services/authRequest";
import { useUserStore } from "stores/userStore";

// types
import { AxiosError } from "axios";
import { LoginType } from "types/LoginType";
import { ErrorResponseType } from "types/ErrorResponseType";
import { AuthResponseType } from "types/AuthResponseType";

function useLogin(inputData: LoginType) {
  const setUserAndToken = useUserStore((state) => state.setUserAndToken);

  const { mutate, isPending, isSuccess, isError, error, data } = useMutation<
    AuthResponseType,
    AxiosError<ErrorResponseType>,
    LoginType
  >({
    mutationFn: loginFn,
    onSuccess: (recievedData) => {
      setUserAndToken(recievedData);
    },
  });

  function login() {
    mutate(inputData);
  }

  return { login, isPending, isSuccess, isError, error, data };
}

export default useLogin;
