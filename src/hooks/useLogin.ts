import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { login as loginFn } from "services/authRequest";
import { useUserStore } from "stores/userStore";

// types
import { LoginType } from "types/LoginType";
import { AuthResponseType } from "types/AuthResponseType";

function useLogin(inputData: LoginType) {
  const setUserAndToken = useUserStore((state) => state.setUserAndToken);

  const { mutate, isPending, isSuccess, isError, error, data } = useMutation<
    AuthResponseType,
    Error,
    LoginType
  >({
    mutationFn: loginFn,
  });

  function login() {
    mutate(inputData);
  }

  useEffect(() => {
    if (isSuccess && data) {
      setUserAndToken(data);
    }
  }, [isSuccess, data, setUserAndToken]);

  return { login, isPending, isSuccess, isError, error, data };
}

export default useLogin;
