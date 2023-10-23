import axios from "axios";
import queryString from "query-string";
import { authActions } from "src/redux/auth/authSlice";
import { store } from "src/redux/store";
import { IErrorResponse } from "src/types/commonTypes";
import { getLocalStorage } from "../localStorage";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getLocalStorage("accessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = "Bearer " + accessToken.slice(0);
    }

    return config;
  },
  (error) => {
    return Promise.reject<IErrorResponse>(error.response);
  }
);
let refreshTokenRetryCount = 0;
const maxRefreshTokenRetries = 3;

axiosInstance.interceptors.response.use((res) => {
  refreshTokenRetryCount = 0;
  return Promise.resolve(res);
}, handleRepositoryError);

async function handleRepositoryError(error: any) {
  const originalConfig = error.config;
  let customError: IErrorResponse = { ...error };
  console.log("originalConfig: ", error, customError);

  if (error.response) {
    // Access token was expired
    if (
      !originalConfig.url.includes("/auth/") &&
      error.response.status === 401 &&
      refreshTokenRetryCount < maxRefreshTokenRetries
    ) {
      refreshTokenRetryCount++;
      try {
        const response = await axiosInstance.post(
          "auth/refresh-token",
          {
            refreshToken: getLocalStorage("refreshToken"),
          },
          {
            withCredentials: false,
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
              "Content-Type": "application/json",
            },
            paramsSerializer: (params) => queryString.stringify(params),
          }
        );
        const { accessToken, refreshToken } = response.data;
        refreshTokenRetryCount = 0;
        store?.dispatch(
          authActions.setItem({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
        return axiosInstance(originalConfig);
      } catch (error) {
        return Promise.reject<IErrorResponse>(error as IErrorResponse);
      }
    }

    refreshTokenRetryCount = 0;

    // in case message is array of error (validation error)
    if (error?.response?.data?.message) {
      if (Array.isArray(error?.response?.data?.message)) {
        customError.message =
          String(error?.response?.data?.message[0][0]).toUpperCase() +
          String(error?.response?.data?.message[0]).slice(1);
      } else {
        customError.message = error?.response?.data?.message;
      }
    }

    return Promise.reject<IErrorResponse>(customError);
  }

  return Promise.reject<IErrorResponse>(customError);
}

export default axiosInstance;