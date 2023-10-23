import { EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddOrEditProductDrawer from "src/components/product/AddOrEditProductDrawer";
import routesList from "src/constants/routesList";
import PageWrap from "src/layouts/PageWrap";
import repositories from "src/repositories";
import { IRouteBreadCrumb } from "src/types/commonTypes";
import { IProduct } from "src/types/productTypes";
import getFullPathMedia from "src/utils/Media/getFullPathMedia";
import formatTime from "src/utils/formatTime";
import { handleError } from "src/utils/handleError";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.HOME,
    title: "Trang chủ",
  },
  {
    to: "",
    title: "Sản phẩm",
  },
  {
    to: routesList.PRODUCT,
    title: "Danh sách sản phẩm",
  },
];

const columns: ColumnsType<IProduct> = [
  {
    title: "ID",
    dataIndex: "idReadable",
    key: "idReadable",
    align: "center",
    width: 100,
    render(value, record, index) {
      return <span>#{value}</span>;
    },
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render(value, record, index) {
      return (
        <Link
          to={record._id as string}
          className="tw-inline-flex tw-items-center">
          <img
            className="tw-w-[40px] tw-h-[40px] object-contain"
            src={getFullPathMedia(record.image)}
            alt=""
          />
          <span className="tw-ml-2">{value}</span>
        </Link>
      );
    },
  },
  {
    title: "Giá",
    dataIndex: "price",
    align: "center",
    key: "price",
    width: "15%",
  },
  {
    title: "Số lượng",
    dataIndex: "stock",
    align: "center",
    key: "stock",
    width: "15%",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    align: "center",
    key: "created_at",
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

const ProductList = () => {
  const [dataList, setDataList] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  const onShowSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(current);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (record: IProduct) => {
    setOpenAddOrEdit(true);
    setSelectedProduct(record);
  };

  useEffect(() => {
    const apiGetList = async () => {
      setLoading(true);
      try {
        const config = {
          params: {
            page: currentPage - 1,
            limit: pageSize,
          },
        };
        const response = await repositories.product.getMany(config);
        setDataList(response.data.dataList);
        setTotal(response.data.totalRecords);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    apiGetList();
  }, [pageSize, currentPage]);

  useEffect(() => {
    columns[columns.length - 1].render = (value, record) => {
      return (
        <Button type="primary" className="la-edit-btn">
          <EditOutlined onClick={() => handleEdit(record)} />
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
          className="product-table"
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

      <AddOrEditProductDrawer
        open={openAddOrEdit}
        setOpen={setOpenAddOrEdit}
        selectedProduct={selectedProduct}
      />
    </PageWrap>
  );
};

export default ProductList;
