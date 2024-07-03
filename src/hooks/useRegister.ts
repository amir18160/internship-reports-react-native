import { useMutation } from "@tanstack/react-query";
import { register as registerFn } from "services/authRequest";

// types
import { RegisterType } from "types/RegisterType";

function useRegister(inputData: RegisterType) {
  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: registerFn,
  });

  function register() {
    mutate(inputData);
  }

  return { register, isPending, isSuccess, isError, error, data };
}

export default useRegister;
