import { HomeOutlined, SketchOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import routesList from "./routesList";

let activeStyle = {
  textDecoration: "underline",
};

let activeClassName = "underline";

export const menuItems = [
  {
    key: "1",
    icon: <HomeOutlined />,
    to: routesList.HOME,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    to: routesList.USER,
    label: "User",
  },
  {
    key: "3",
    icon: <SketchOutlined />,
    to: routesList.PRODUCT,
    label: "Product",
  },
];
