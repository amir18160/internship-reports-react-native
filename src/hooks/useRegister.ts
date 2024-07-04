import { useMutation } from "@tanstack/react-query";
import { register as registerFn } from "services/authRequest";

// zustand
import { useUserStore } from "stores/userStore";

// types
import { AxiosError } from "axios";
import { RegisterType } from "types/RegisterType";
import { AuthResponseType } from "types/AuthResponseType";
import { ErrorResponseType } from "types/ErrorResponseType";

function useRegister(inputData: RegisterType) {
  const setUserAndToken = useUserStore((state) => state.setUserAndToken);

  const { mutate, isPending, isSuccess, isError, error, data } = useMutation<
    AuthResponseType,
    AxiosError<ErrorResponseType>,
    RegisterType
  >({
    mutationFn: registerFn,
    onSuccess: (recievedData) => {
      setUserAndToken(recievedData);
    },
  });

  function register() {
    mutate(inputData);
  }

  return { register, isPending, isSuccess, isError, error, data };
}

export default useRegister;
