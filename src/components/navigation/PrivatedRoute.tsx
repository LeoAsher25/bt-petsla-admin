import React from "react";
import routesList from "src/constants/routesList";
import { RootState, useAppSelector } from "src/redux/store";
import { Outlet, Navigate } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";

const PrivatedRoute = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);
  return accessToken ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to={routesList.LOGIN} />
  );
};

export default PrivatedRoute;
