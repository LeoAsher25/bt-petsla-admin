import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import { menuItems } from "src/constants/menu-items";

const { Header, Sider, Content } = Layout;

interface IProps {
  children?: ReactNode;
}

const Page = (props: IProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="min-h-screen overflow-hidden"
      >
        <div className="logo h-[66px] p-3">
          <img
            src={collapsed ? "/img/collapsed.png" : "/img/shopLogo.png"}
            alt="Logo"
            className="h-full mx-auto"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          <div
            className="  trigger cursor-pointer "
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 20,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Page;
