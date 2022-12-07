import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { menuItems } from "src/constants/menu-items";

const MenuList = () => {
  let location = useLocation();

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["/"]}
      selectedKeys={[location.pathname]}
      items={menuItems.map((item) => ({
        key: item.to,
        icon: item.icon,
        label: <NavLink to={item.to}>{item.label}</NavLink>,
      }))}
    />
  );
};

export default MenuList;
