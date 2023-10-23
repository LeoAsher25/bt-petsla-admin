import React from "react";
import routesList from "src/constants/routesList";
import PageWrap from "src/layouts/PageWrap";
import { IRouteBreadCrumb } from "src/types/commonTypes";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.PRODUCT,
    title: "Trang chủ",
  },
  {
    to: "",
    title: "Sản phẩm",
  },
  {
    to: `${routesList.PRODUCT}/add`,
    title: "Thêm mới sản phẩm",
  },
];

const AddNewProduct = () => {
  return (
    <PageWrap title="Thêm mới sản phẩm" routes={routes}>
      <div></div>
    </PageWrap>
  );
};

export default AddNewProduct;
