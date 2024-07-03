import axios, { AxiosResponse } from "axios";

// routes
import { loginUrl, registerUrl } from "./apiRoutes";

// types
import { Token } from "types/TokenType";
import { User } from "types/UserType";
import { LoginType } from "types/LoginType";
import { RegisterType } from "types/RegisterType";

interface AuthResponseType {
  user: User;
  token: Token;
}

export const login = async (data: LoginType): Promise<AuthResponseType> => {
  const res: AxiosResponse = await axios.post<AuthResponseType>(loginUrl, data);
  return res.data;
};

export const register = async (data: RegisterType): Promise<AuthResponseType> => {
  const res: AxiosResponse = await axios.post<AuthResponseType>(registerUrl, data);
  return res.data;
};

export const logout = async () => {
  const res: AxiosResponse = await axios.post(loginUrl);
  return res.data;
};
