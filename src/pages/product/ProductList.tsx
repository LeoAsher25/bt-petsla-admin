import { EditOutlined } from "@ant-design/icons";
import { Button, notification, Pagination, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productStatusList } from "src/constants/products";
import routesList from "src/constants/routesList";
import MainPage from "src/layouts/MainPage";
import repositories from "src/repositories";
import { IRouteBreadCrumb } from "src/types/commonTypes";
import { IProduct } from "src/types/productTypes";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.HOME,
    title: "Home",
  },
  {
    to: "",
    title: "Product List",
  },
];

const columns: ColumnsType<IProduct> = [
  // {
  //   title: "ID",
  //   dataIndex: "key",
  //   key: "key",
  //   render(value, record, index) {
  //     return <span># {value}</span>;
  //   },
  // },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render(value, record, index) {
      return (
        <Link to={record._id!} className="flex items-center">
          <img
            className="w-[30px] h-[30px] object-contain"
            src={record.images[0]}
            alt=""
          />
          <span className="ml-2">{value}</span>
        </Link>
      );
    },
  },
  {
    title: "Stock",
    dataIndex: "stock",
    align: "center",
    key: "stock",
  },
  {
    title: "Price",
    dataIndex: "price",
    align: "center",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render(value, record, index) {
      return (
        <Tag
          color={productStatusList[value].color}
          className="w-[90px] text-center
        "
        >
          {productStatusList[value].title}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render(value, record, index) {
      return (
        <Button type="primary" className="la-edit-btn">
          <EditOutlined />
        </Button>
      );
    },
  },
];

const ProductList = () => {
  const [data, setData] = useState<IProduct[]>([]);
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
  let a = 1;

  useEffect(() => {
    const apiGetList = async () => {
      console.log("a: ", a++);
      setLoading(true);
      try {
        const config = {
          params: {
            page: currentPage,
            size: pageSize,
          },
        };
        const response = await repositories.product.getMany(config);
        setData(response.data.data);
        setTotal(response.data.pagination.total);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        notification.error({
          message: "error",
        });
      }
    };

    apiGetList();
  }, [pageSize, currentPage]);
  return (
    <MainPage title="Product List" routes={routes}>
      <div className="product-list-page bg-white">
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={false}
          rowKey="_id"
        ></Table>
        <div className="flex justify-end p-5">
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
    </MainPage>
  );
};

export default ProductList;
