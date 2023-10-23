import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IProduct } from "src/types/productTypes";
import { IErrorResponse } from "src/types/commonTypes";
import axiosInstance from "src/utils/axiosInstance";

const getMany = createAsyncThunk(
  "product/login",
  async (config: any, thunkApi) => {
    try {
      const res: AxiosResponse<IProduct[]> = await axiosInstance.get(
        "/product/getMany",
        config
      );
      return res;
    } catch (err) {
      const error = err as AxiosResponse<IErrorResponse>;
      return thunkApi.rejectWithValue(error);
    }
  }
);

const productThunkActions = {
  getMany,
};

export default productThunkActions;
