import { Route, Routes } from "react-router-dom";
import routesList from "src/constants/routesList";
import LoginPage from "src/pages/auth/LoginPage";
import DetailOrderPage from "src/pages/order/DetailOrderPage";
import OrderListPage from "src/pages/order/OrderListPage";
import AddNewProduct from "src/pages/product/AddNewProduct";
import ProductDetail from "src/pages/product/ProductDetail";
import ProductList from "src/pages/product/ProductList";
import PrivatedRoute from "./PrivatedRoute";
import UserPage from "src/pages/user/UserPage";
const MainRouters = () => (
  <Routes>
    <Route path="/" element={<PrivatedRoute />}>
      <Route path={routesList.HOME} element={<div>HOME </div>} />
      <Route path={routesList.USER} element={<UserPage />} />

      {/* products page */}
      <Route path={`${routesList.PRODUCT}/add`} element={<AddNewProduct />} />
      <Route
        path={`${routesList.PRODUCT}/:productId`}
        element={<ProductDetail />}
      />
      <Route path={routesList.PRODUCT} element={<ProductList />} />
      <Route path={routesList.ORDER} element={<OrderListPage />} />

      <Route path={`${routesList.ORDER}/:id`} element={<DetailOrderPage />} />
    </Route>

    <Route path={routesList.LOGIN} element={<LoginPage />} />
  </Routes>
);
export default MainRouters;
