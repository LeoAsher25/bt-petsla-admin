import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddOrEditUserDrawer from "src/components/user/AddOrEditUserDrawer";
import routesList from "src/constants/routesList";
import PageWrap from "src/layouts/PageWrap";
import repositories from "src/repositories";
import { IUser } from "src/types/authTypes";
import { IRouteBreadCrumb } from "src/types/commonTypes";
import getEnumObject from "src/utils/enumObject";

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
    width: "15%",
    render(value, record) {
      return (
        <div className="tw-inline-flex tw-items-center">
          {`${record.lastName} ${record.firstName}`}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    align: "left",
    key: "email",
    width: "20%",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    align: "center",
    key: "phoneNumber",
    width: "15%",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    align: "center",
    key: "gender",
    width: "10%",
    render(value) {
      return getEnumObject.getGender(value)?.text;
    },
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    align: "center",
    key: "role",
    width: "10%",
    render(value) {
      return getEnumObject.getUserRole(value)?.text;
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    align: "center",
    key: "createdAt",
    width: "10%",
    render(value) {
      return formatTime(value);
    },
  },
  {
    title: "Hành động",
    key: "action",
    align: "center",
    width: "10%",
  },
];

const UserPage = () => {
  const [dataList, setDataList] = useState<IUser[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>();

  const onShowSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (record: IUser) => {
    setSelectedUser(record);
    setOpenAddOrEdit(true);
  };

  const handleToggleDrawer = (value: boolean) => {
    setSelectedUser(undefined);
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

  const handleDeleteClick = (user: IUser) => {
    setSelectedUser(user);
    setOpenConfirmDelete(true);
  };

  const handleDeleteOk = async () => {
    try {
      await repositories.user.delete(selectedUser?._id!);
      getDataList();
      toast.success("Xóa người dùng thành công");
      setOpenConfirmDelete(false);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, [pageSize, currentPage, getDataList]);

  useEffect(() => {
    columns[columns.length - 1].render = (value, record) => {
      return (
        <div className="tw-flex tw-items-center tw-gap-4 tw-justify-center">
          <Button
            type="primary"
            danger
            className=""
            onClick={() => handleDeleteClick(record)}>
            <DeleteOutlined />
          </Button>

          <Button
            type="primary"
            className=""
            onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
        </div>
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
        selectedUser={selectedUser!}
        submitSuccess={handleSubmitSuccess}
      />

      <Modal
        title="Xác nhận xóa"
        open={openConfirmDelete}
        onOk={handleDeleteOk}
        centered
        cancelText="Không"
        okText="Xác nhận"
        onCancel={() => setOpenConfirmDelete(false)}>
        <p>Bạn có chắc sẽ xóa không?</p>
      </Modal>
    </PageWrap>
  );
};

export default UserPage;
