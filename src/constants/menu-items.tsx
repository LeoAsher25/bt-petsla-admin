import { HomeOutlined, SketchOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import routesList from "./routesList";

export const menuItems = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <NavLink to={routesList.HOME}> Dashboard </NavLink>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <NavLink to={routesList.USER}> User </NavLink>,
  },
  {
    key: "3",
    icon: <SketchOutlined />,
    label: <NavLink to={routesList.PRODUCT}> Product </NavLink>,
  },
];
