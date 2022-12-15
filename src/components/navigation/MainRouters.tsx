import { Route, Routes } from "react-router-dom";
import routesList from "src/constants/routesList";
import LoginPage from "src/pages/auth/LoginPage";
import ProductDetail from "src/pages/product/ProductDetail";
import ProductList from "src/pages/product/ProductList";
import PrivatedRoute from "./PrivatedRoute";
const MainRouters = () => (
  <Routes>
    <Route path="/" element={<PrivatedRoute />}>
      <Route path={routesList.HOME} element={<div>HOME </div>} />
      <Route path={routesList.USER} element={<div>USER </div>} />
      <Route
        path={`${routesList.PRODUCT}/:productId`}
        element={<ProductDetail />}
      />
      <Route path={routesList.PRODUCT} element={<ProductList />} />
    </Route>

    <Route path={routesList.LOGIN} element={<LoginPage />} />
  </Routes>
);
export default MainRouters;
