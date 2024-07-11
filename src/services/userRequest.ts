import axios, { AxiosResponse } from "axios";
import { userInfoUrl, updateUserUrl, queryUserUrl } from "services/apiRoutes";

import { User } from "types/UserType";
import { UpdateUserInputType } from "types/UpdateUserInput";

type QueryUserType = {
  identificationNumber: string;
  isUserConfirmed: boolean;
  firstName: string;
  lastName: string;
};

export const queryUser = async ({
  firstName,
  lastName,
  identificationNumber,
  isUserConfirmed,
}: QueryUserType): Promise<AxiosResponse<User>> => {
  const response = await axios.get(queryUserUrl, {
    params: {
      identificationNumber,
      isUserConfirmed,
      firstName,
      lastName,
    },
  });

  return response;
};

export const updateUser = async ({
  userId,
  firstName,
  lastName,
  identificationNumber,
  isUserConfirmed,
  internStatus,
  internshipMentor,
  workingField,
}: UpdateUserInputType) => {
  const response = await axios.patch(`${updateUserUrl}/${userId}`, {
    identificationNumber,
    isUserConfirmed,
    firstName,
    lastName,
    internStatus,
    internshipMentor,
    workingField,
  });

  return response.data;
};
