import React from "react";
import routesList from "src/constants/routesList";
import { RootState, useAppSelector } from "src/redux/store";
import { Outlet, Navigate } from "react-router-dom";

const PrivatedRoute = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);
  return accessToken ? <Outlet /> : <Navigate to={routesList.LOGIN} />;
};

export default PrivatedRoute;
