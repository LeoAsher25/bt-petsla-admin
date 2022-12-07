import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { authActions } from "src/redux/auth/authSlice";
import { useAppDispatch } from "src/redux/store";
import MenuList from "./MenuList";

const { Header, Sider, Content } = Layout;

interface IProps {
  children?: ReactNode;
}

const MainLayout = (props: IProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authActions.handleLogout({}));
    toast.success("Logout successfully");
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="min-h-screen overflow-hidden">
        <div className="logo h-[66px] p-3">
          <img
            src={collapsed ? "/img/collapsed.png" : "/img/shopLogo.png"}
            alt="Logo"
            className="h-full mx-auto"
          />
        </div>
        <MenuList />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}>
          <div className="flex items-center justify-between">
            <div
              className="  trigger cursor-pointer "
              onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>

            <Button type="primary" className="mx-3" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: "0.5rem 0.75rem",
          }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
