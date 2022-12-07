import queryString from "query-string";
import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.BASE_API_URL || "http://localhost:2000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: { serialize: (params) => queryString.stringify(params) },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // let { accessToken, expiresAt, refreshToken } = store.getState().auth;
    // if (expiresAt && Date.now() >= expiresAt) {
    //   console.log("expired");
    //   store.dispatch(setExpiresAt(null));
    //   const response = await axiosInstance.post("auth/refresh-token", {
    //     refreshToken,
    //     redirectUri: "universe://",
    //   });
    //   console.log("refresh token successfully!");
    //   accessToken = response.data.access_token;
    //   store.dispatch(handleSetToken(response.data));
    //   if (accessToken && config.headers) {
    //     config.headers["Authorization"] = "Bearer " + accessToken;
    //   }
    // } else {
    //   if (accessToken && config.headers) {
    //     config.headers["Authorization"] = "Bearer " + accessToken;
    //   }
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    // const originalConfig = err.config;
    // if (originalConfig.url !== "auth/verify" && err.response) {
    //   // Access token was expired
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;
    //     try {
    //       const response = await axiosInstance.post("auth/refresh-token", {
    //         refreshToken: await getData("refreshToken"),
    //         redirectUri: "universe://",
    //       });
    //       const { access_token } = response.data;
    //       storeData("accessToken", access_token);
    //       // set token;
    //       return axiosInstance(originalConfig);
    //     } catch (error) {
    //       return Promise.reject(error);
    //     }
    //   }
    // }
    return Promise.reject(err.response);
    // return Promise.resolve(err);
  }
);

export default axiosInstance;
