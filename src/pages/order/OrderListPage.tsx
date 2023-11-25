import { Tabs, TabsProps } from "antd";
import { enumObjectList } from "src/utils/enumObject";
import OrderList from "./OrderList";
import PageWrap from "src/layouts/PageWrap";
import { IRouteBreadCrumb } from "src/types/commonTypes";
import routesList from "src/constants/routesList";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.HOME,
    title: "Trang chủ",
  },
  {
    to: "",
    title: "Đơn hàng",
  },
  {
    to: routesList.ORDER,
    title: "Danh sách đơn hàng",
  },
];

const items: TabsProps["items"] = enumObjectList.orderStatus.map((item) => ({
  label: item.text!,
  key: item.key!,
  children: <OrderList orderStatus={item.value} />,
}));

const OrderListPage = () => {
  return (
    <PageWrap routes={routes}>
      <div className="tw-mt-4">
        <Tabs type="card" defaultActiveKey="PENDING" items={items} />
      </div>
    </PageWrap>
  );
};

export default OrderListPage;
