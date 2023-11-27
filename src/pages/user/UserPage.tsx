import { EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import AddOrEditUserDrawer from "src/components/user/AddOrEditUserDrawer";
import routesList from "src/constants/routesList";
import PageWrap from "src/layouts/PageWrap";
import repositories from "src/repositories";
import { IUser } from "src/types/authTypes";
import { IRouteBreadCrumb } from "src/types/commonTypes";

import formatTime from "src/utils/formatTime";
import { handleError } from "src/utils/handleError";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.HOME,
    title: "Trang chủ",
  },
  {
    to: "",
    title: "Người dùng",
  },
  {
    to: routesList.USER,
    title: "Danh sách người dùng",
  },
];

const columns: ColumnsType<IUser> = [
  {
    title: "ID",
    dataIndex: "idReadable",
    key: "idReadable",
    align: "center",
    width: 150,
    render(value) {
      return <span>#{value}</span>;
    },
  },
  {
    title: "Tên",
    dataIndex: "firstName",
    key: "firstName",
    render(value, record) {
      console.log("record: ", record);
      return (
        <div className="tw-inline-flex tw-items-center">
          {`${record.lastName} ${record.firstName}`}
        </div>
      );
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    align: "center",
    key: "phoneNumber",
    width: "15%",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    align: "center",
    key: "role",
    width: "15%",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    align: "center",
    key: "createdAt",
    width: "15%",
    render(value) {
      return formatTime(value);
    },
  },
  {
    title: "Hành động",
    key: "action",
    align: "center",
    width: "15%",
  },
];

const UserPage = () => {
  const [dataList, setDataList] = useState<IUser[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IUser>();

  const onShowSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (record: IUser) => {
    setSelectedProduct(record);
    setOpenAddOrEdit(true);
  };

  const handleToggleDrawer = (value: boolean) => {
    setSelectedProduct(undefined);
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
      const response = await repositories.user.getMany(config);
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
    <PageWrap
      routes={routes}
      headerActionList={
        <Button type="primary" onClick={() => setOpenAddOrEdit(true)}>
          Thêm mới
        </Button>
      }>
      <div className="tw-product-list-page bg-white">
        <Table
          className="product-table custom-table"
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

      <AddOrEditUserDrawer
        open={openAddOrEdit}
        setOpen={handleToggleDrawer}
        selectedProduct={selectedProduct}
        submitSuccess={handleSubmitSuccess}
      />
    </PageWrap>
  );
};

export default UserPage;
