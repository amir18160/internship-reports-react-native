// lib
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

// service
import { updateUser as updateUserFn } from "services/userRequest";

// types
import { UpdateUserInputType } from "types/UpdateUserInput";
import { User } from "types/UserType";

// store
import { useUserStore } from "stores/userStore";

type ErrorResponse = {
  message: string;
  status: string;
};

type UpdateResponse = {
  status: string;
  updatedUser: User;
};

export const useUpdateUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation<
    UpdateResponse,
    AxiosError<ErrorResponse>,
    UpdateUserInputType
  >({
    mutationFn: updateUserFn,
    onSuccess: (_data) => {
      console.log(_data.updatedUser);
    },
  });

  return { mutate, isPending, isError, error, isSuccess, data };
};
