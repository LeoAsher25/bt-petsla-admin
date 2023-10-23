import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ILoginResponseData, IUser } from "src/types/authTypes";
import { IErrorResponse } from "src/types/commonTypes";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";
import authThunkActions from "./authThunkActions";

interface IAuthState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  currentUser: IUser | null;
}

const initialState: IAuthState = {
  accessToken: getLocalStorage("accessToken"),
  refreshToken: getLocalStorage("refreshToken"),
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout(state, action) {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      removeLocalStorage("accessToken");
      removeLocalStorage("refreshToken");
    },
    setItem(state, action) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authThunkActions.login.fulfilled,
      (state, action: PayloadAction<AxiosResponse<ILoginResponseData>>) => {
        const { accessToken, refreshToken } = action.payload.data;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        setLocalStorage("accessToken", accessToken);
        setLocalStorage("refreshToken", refreshToken);
      }
    );
    builder.addCase(authThunkActions.login.rejected, (state, action) => {
      const payload = action.payload as AxiosResponse<IErrorResponse>;
    });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
export const authActions = authSlice.actions;
