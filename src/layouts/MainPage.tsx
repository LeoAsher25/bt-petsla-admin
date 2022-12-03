import { Breadcrumb } from "antd";
import React, { ReactNode, ReactPropTypes } from "react";
import { Link } from "react-router-dom";
import { IRouteBreadCrumb } from "src/types/commonTypes";

interface IMainPageProps {
  title: string;
  routes: IRouteBreadCrumb[];
  actionList?: ReactNode[];
  children?: ReactNode;
}

const MainPage = (props: IMainPageProps) => {
  return (
    <div className="main-page">
      <div className="main-page-header p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{props.title}</div>
          <Breadcrumb separator=">">
            {props.routes.map((item, index) => (
              <Breadcrumb.Item key={index} href="">
                <Link to={item.to}>{item.title}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>

        <div className="flex items-center">{props.actionList}</div>
      </div>
    </div>
  );
};

export default MainPage;
