import { useEffect } from "react";
import routesList from "src/constants/routesList";
import MainPage from "src/layouts/MainPage";
import { useAppDispatch } from "src/redux/store";
import repositories from "src/repositories";
import { IRouteBreadCrumb } from "src/types/commonTypes";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.HOME,
    title: "Home",
  },
  {
    to: "",
    title: "Product List",
  },
];

const ProductList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const apiGetList = async () => {
      const response = await repositories.product.get();
      console.log("response: ", response);
    };

    apiGetList();
  }, []);
  return <MainPage title="Product List" routes={routes}></MainPage>;
};

export default ProductList;
