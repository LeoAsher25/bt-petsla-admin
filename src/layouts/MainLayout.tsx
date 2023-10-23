import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { AxiosResponse } from "axios";
import { stat } from "fs";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authActions } from "src/redux/auth/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "src/redux/store";
import repositories from "src/repositories";
import { IErrorResponse } from "src/types/commonTypes";
import MenuList from "./MenuList";

const { Header, Sider, Content } = Layout;

interface IProps {
  children?: ReactNode;
}

const MainLayout = (props: IProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authActions.handleLogout({}));
    toast.success("Đăng xuất thành công!");
  };

  useEffect(() => {
    if (accessToken) {
      const fetchProfile = async () => {
        try {
          const res = await repositories.auth.get("profile");
          console.log("res profile: ", res);
        } catch (err) {
          console.log("err: ", err);
        }
      };

      // fetchProfile();
    }
  }, [accessToken]);

  return (
    <Layout className="tw-min-h-screen">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="tw-min-h-screen tw-overflow-hidden">
        <div className="logo tw-h-[66px] tw-p-3">
          <img
            src={collapsed ? "/img/petsla.png" : "/img/shopLogo.png"}
            alt="Logo"
            className={`tw-h-full tw-mx-auto tw-duration-200 ${
              collapsed ? "tw-translate-x-2" : ""
            }`}
          />
        </div>
        <MenuList />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}>
          <div className="tw-flex tw-items-center tw-justify-between">
            <div
              className="trigger tw-cursor-pointer "
              onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>

            <Button type="primary" className="tw-mx-3" onClick={handleLogout}>
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
