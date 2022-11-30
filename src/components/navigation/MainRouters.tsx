import { Route, Routes } from "react-router-dom";
import routesList from "src/constants/routesList";
import Page from "src/layouts/page";
import LoginPage from "src/pages/auth/LoginPage";
import PrivatedRoute from "./PrivatedRoute";

const MainRouters = () => (
  <Routes>
    <Route path="/" element={<PrivatedRoute />}>
      <Route path={routesList.HOME} element={<Page>HOME </Page>} />
      <Route path={routesList.USER} element={<Page>USER </Page>} />
      <Route path={routesList.PRODUCT} element={<Page>PRODUCT </Page>} />
    </Route>

    <Route path={routesList.LOGIN} element={<LoginPage />} />
  </Routes>
);
export default MainRouters;
