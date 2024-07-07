/* eslint-disable @typescript-eslint/dot-notation */

import { useEffect } from "react";
import axios from "axios";
import apiUrl from "constants/apiUrl";
import { useUserStore } from "stores/userStore";

export const useAxiosInterceptors = () => {
  useEffect(() => {
    axios.defaults.baseURL = `${apiUrl}/api`;
    axios.defaults.headers.common["Content-Type"] = "application/json";

    const requestInterceptor = axios.interceptors.request.use(
      function (config) {
        const userToken = useUserStore.getState().token?.token;

        if (userToken) {
          config.headers["Authorization"] = userToken;
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response?.data?.messageCode === "UNAUTHORIZED_LOGIN_REQUIRED") {
          // Clear local storage and userState
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
