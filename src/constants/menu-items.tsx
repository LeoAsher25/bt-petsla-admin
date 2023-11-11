import {
  HomeOutlined,
  SketchOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import routesList from "./routesList";

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
    label: "Người dùng",
  },
  {
    key: "3",
    icon: <SketchOutlined />,
    to: routesList.PRODUCT,
    label: "Sản phẩm",
  },
  {
    key: "4",
    icon: <TrophyOutlined />,
    to: routesList.ORDER,
    label: "Đơn hàng",
  },
];
