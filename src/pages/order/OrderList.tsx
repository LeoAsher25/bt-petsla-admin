import { Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomTag from "src/components/CustomTag";
import routesList from "src/constants/routesList";
import repositories from "src/repositories";
import { EOrderStatus, IOrder } from "src/types/productTypes";
import getEnumObject from "src/utils/enumObject";
import formatTime from "src/utils/formatTime";
import { handleError } from "src/utils/handleError";

const columns: ColumnsType<IOrder> = [
  {
    title: "ID",
    dataIndex: "idReadable",
    key: "idReadable",
    align: "center",
    width: 100,
    render: (value, record) => (
      <Link to={`${routesList.ORDER}/${record._id}`}>
        <span>#{value}</span>
      </Link>
    ),
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
    title: "Họ tên",
    dataIndex: "fullName",
    align: "left",
    key: "fullName",
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
      return (
        <CustomTag
          color={getEnumObject.getOrderStatus(value)?.color}
          text={getEnumObject.getOrderStatus(value)?.text}
        />
      );
    },
  },
  {
    title: "TT thanh toán",
    dataIndex: "paymentStatus",
    align: "center",
    key: "paymentStatus",
    width: "15%",
    render(value) {
      return (
        <CustomTag
          color={getEnumObject.getPaymentStatus(value)?.color}
          text={getEnumObject.getPaymentStatus(value)?.text}
        />
      );
    },
  },
  // {
  //   title: "Hành động",
  //   key: "action",
  //   align: "center",
  //   width: "10%",
  // },
];
interface IOrderListProps {
  orderStatus?: EOrderStatus;
}

const OrderList = ({ orderStatus }: IOrderListProps) => {
  const [dataList, setDataList] = useState<IOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const onShowSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const getDataList = useCallback(async () => {
    setLoading(true);
    try {
      const config = {
        params: {
          page: currentPage - 1,
          limit: pageSize,
          isAdmin: true,
          orderStatus,
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
  }, [currentPage, pageSize, orderStatus]);

  const handleSubmitSuccess = () => {
    getDataList();
  };

  useEffect(() => {
    getDataList();
  }, [pageSize, currentPage, getDataList]);

  // useEffect(() => {
  //   columns[columns.length - 1].render = (value, record) => {
  //     return (
  //       <Button
  //         type="primary"
  //         className="la-edit-btn"
  //         onClick={() => handleEdit(record)}>
  //         <EditOutlined />
  //       </Button>
  //     );
  //   };
  // }, []);

  return (
    <div className="bg-white">
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
  );
};

export default OrderList;
