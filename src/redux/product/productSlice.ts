import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IProduct } from "src/types/productTypes";
import productThunkActions from "./productThunkActions";

interface IProductState {
  productList: IProduct[];
}

const initialState: IProductState = {
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItem(state, action) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      productThunkActions.getMany.fulfilled,
      (state, action: PayloadAction<AxiosResponse<IProduct[]>>) => {
        state.productList = action.payload.data;
      }
    );
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
export const productActions = productSlice.actions;
