import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  accessToken: string | null;
}

const initialState: IAuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

const authReducer = authSlice.reducer;
export default authReducer;
export const authActions = authSlice.actions;
