import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ILoginResponseData } from "src/types/authTypes";
import { ErrorResponse } from "src/types/commonTypes";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";
import authThunkActions from "./authThunkActions";

interface IAuthState {
  accessToken: string | undefined;
}

const initialState: IAuthState = {
  accessToken: getLocalStorage("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout(state, action) {
      state.accessToken = undefined;
      removeLocalStorage("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authThunkActions.login.fulfilled,
      (state, action: PayloadAction<AxiosResponse<ILoginResponseData>>) => {
        const accessToken = action.payload.data.accessToken;
        state.accessToken = accessToken;
        setLocalStorage("accessToken", accessToken);
      }
    );
    builder.addCase(authThunkActions.login.rejected, (state, action) => {
      const payload = action.payload as AxiosResponse<ErrorResponse>;
    });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
export const authActions = authSlice.actions;
