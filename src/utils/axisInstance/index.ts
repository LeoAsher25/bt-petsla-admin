import axios, { AxiosResponse } from "axios";
import queryString from "query-string";
import { authActions } from "src/redux/auth/authSlice";
import { store } from "src/redux/store";
import { ErrorResponse } from "src/types/commonTypes";
import { getLocalStorage } from "../localStorage";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.BASE_API_URL || "http://localhost:2000/api/v1",
  // || "http://localhost:2000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: { serialize: (params) => queryString.stringify(params) },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getLocalStorage("accessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = "Bearer " + accessToken.slice(0, -1);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url.includes("/auth/") && err.response) {
      // Access token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const response = await axiosInstance.post("auth/refresh-token", {
            refreshToken: getLocalStorage("refreshToken"),
          });

          console.log("response: ", response);

          const { accessToken, refreshToken } = response.data;
          // setLocalStorage("accessToken", access_token);
          // set token
          store?.dispatch(
            authActions.setItem({
              accessToken,
              refreshToken,
            })
          );

          return axiosInstance(originalConfig);
        } catch (error) {
          const appError: AxiosResponse<ErrorResponse> = {
            ...(error as any).response,
            data: {
              code: "UNAUTHORIZED",
              message: "Unauthorized",
            },
          };
          console.log("check error: ", appError);
          return Promise.reject(error);
        }
      }
    }
    console.error("axios error: ", err);
    return Promise.reject(err.response as AxiosResponse<ErrorResponse>);
    // return Promise.resolve(err);
  }
);

export default axiosInstance;
