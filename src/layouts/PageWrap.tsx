import { Breadcrumb } from "antd";
import { ReactElement, ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IRouteBreadCrumb } from "src/types/commonTypes";

interface IPageWrapProps {
  title?: string;
  routes: IRouteBreadCrumb[];
  headerActionList?: JSX.Element | ReactElement | ReactNode | ReactNode[];
  children?: JSX.Element | ReactElement | ReactNode | ReactNode[];
}

const PageWrap = (props: IPageWrapProps) => {
  useEffect(() => {
    document.title = props.title
      ? props.title
      : props.routes[props.routes.length - 1].title;
  }, [props.title, props.routes]);
  const location = useLocation();
  return (
    <div className="page-wrap">
      <div className="page-wrap-header tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-flex-col">
          <div className="tw-text-lg tw-font-semibold">
            {props.title
              ? props.title
              : props.routes[props.routes.length - 1].title}
          </div>
          <Breadcrumb separator=">">
            {props.routes.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <Link
                  to={item.to}
                  className={
                    index === props.routes.length - 1
                      ? "!tw-text-[#1677ffaa] hover:!tw-bg-transparent tw-cursor-default tw-pointer-events-none"
                      : !item.to
                      ? "hover:!tw-bg-transparent hover:!tw-text-[#00000073] tw-cursor-default"
                      : ""
                  }>
                  {item.title}
                </Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>

        <div className="tw-flex tw-items-center">{props.headerActionList}</div>
      </div>
      {props.children}
    </div>
  );
};

export default PageWrap;
