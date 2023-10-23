import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import repositories from "src/repositories";
import { ILoginResponseData } from "src/types/authTypes";

const login = createAsyncThunk("auth/login", async (data: any, thunkApi) => {
  try {
    const res: AxiosResponse<ILoginResponseData> = await repositories.auth.post(
      data,
      "login"
    );
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const authThunkActions = {
  login,
};

export default authThunkActions;
