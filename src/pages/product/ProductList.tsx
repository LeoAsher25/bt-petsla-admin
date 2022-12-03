import routesList from "src/constants/routesList";
import MainPage from "src/layouts/MainPage";
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
  return <MainPage title="Product List" routes={routes}></MainPage>;
};

export default ProductList;
