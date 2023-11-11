import { EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import routesList from "src/constants/routesList";
import PageWrap from "src/layouts/PageWrap";
import repositories from "src/repositories";
import { IRouteBreadCrumb } from "src/types/commonTypes";
import { IOrder } from "src/types/productTypes";
import formatTime from "src/utils/formatTime";
import getEnumObject from "src/utils/getEnumText";
import { handleError } from "src/utils/handleError";

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

const columns: ColumnsType<IOrder> = [
  {
    title: "ID",
    dataIndex: "idReadable",
    key: "idReadable",
    align: "center",
    width: 100,
    render(value) {
      return <span>#{value}</span>;
    },
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "createdAt",
    align: "center",
    key: "createdAt",
    render(value) {
      return <div className=" ">{formatTime(value)}</div>;
    },
    width: "10%",
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalCost",
    align: "center",
    key: "totalCost",
    width: "10%",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    align: "left",
    key: "address",
  },
  {
    title: "TT đơn hàng",
    dataIndex: "orderStatus",
    align: "center",
    key: "orderStatus",
    width: "15%",
    render(value) {
      return getEnumObject.getOrderStatus(value)?.text;
    },
  },
  {
    title: "TT thanh toán",
    dataIndex: "orderStatus",
    align: "center",
    key: "orderStatus",
    width: "15%",
    render(value) {
      return getEnumObject.getPaymentStatus(value)?.text;
    },
  },
  {
    title: "Hành động",
    key: "action",
    align: "center",
    width: "10%",
  },
];

const OrderList = () => {
  const [dataList, setDataList] = useState<IOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();

  const onShowSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (record: IOrder) => {
    setSelectedOrder(record);
    setOpenAddOrEdit(true);
  };

  const handleToggleDrawer = (value: boolean) => {
    setSelectedOrder(undefined);
    setOpenAddOrEdit(value);
  };

  const getDataList = useCallback(async () => {
    setLoading(true);
    try {
      const config = {
        params: {
          page: currentPage - 1,
          limit: pageSize,
        },
      };
      const response = await repositories.order.getMany(config);
      setDataList(response.data.dataList);
      setTotal(response.data.totalRecords);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  const handleSubmitSuccess = () => {
    getDataList();
  };

  useEffect(() => {
    getDataList();
  }, [pageSize, currentPage, getDataList]);

  useEffect(() => {
    columns[columns.length - 1].render = (value, record) => {
      return (
        <Button
          type="primary"
          className="la-edit-btn"
          onClick={() => handleEdit(record)}>
          <EditOutlined />
        </Button>
      );
    };
  }, []);

  return (
    <PageWrap routes={routes}>
      <div className="tw-product-list-page bg-white">
        <Table
          className=" custom-table"
          dataSource={dataList}
          columns={columns}
          loading={loading}
          pagination={false}
          rowKey="_id"></Table>
        <div className="tw-flex justify-end p-5">
          <Pagination
            pageSize={pageSize}
            current={currentPage}
            total={total}
            showSizeChanger
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </div>

      {/* <AddOrEditOrderDrawer
        open={openAddOrEdit}
        setOpen={handleToggleDrawer}
        selectedOrder={selectedOrder}
        submitSuccess={handleSubmitSuccess}
      /> */}
    </PageWrap>
  );
};

export default OrderList;
