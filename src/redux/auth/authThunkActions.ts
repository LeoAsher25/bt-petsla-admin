import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ILoginResponseData } from "src/types/authTypes";
import { ErrorResponse } from "src/types/commonTypes";
import axiosInstance from "src/utils/axisInstance";

const login = createAsyncThunk("auth/login", async (data: any, thunkApi) => {
  try {
    const res: AxiosResponse<ILoginResponseData> = await axiosInstance.post(
      "/auth/login",
      data
    );

    return { ...res };
  } catch (err) {
    const error = err as AxiosResponse<ErrorResponse>;
    return thunkApi.rejectWithValue(error);
  }
});

const authThunkActions = {
  login,
};

export default authThunkActions;
