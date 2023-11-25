import { Button, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomTag from "src/components/CustomTag";
import routesList from "src/constants/routesList";
import PageWrap from "src/layouts/PageWrap";
import repositories from "src/repositories";
import { IRouteBreadCrumb } from "src/types/commonTypes";
import { IOrder, IOrderItem } from "src/types/productTypes";
import getFullPathMedia from "src/utils/Media/getFullPathMedia";
import getEnumObject, { enumObjectList } from "src/utils/enumObject";
import formatTime from "src/utils/formatTime";
import { handleError } from "src/utils/handleError";

const routes: IRouteBreadCrumb[] = [
  {
    to: routesList.HOME,
    title: "Trang chủ",
  },
  {
    to: routesList.ORDER,
    title: "Đơn hàng",
  },
  {
    to: "",
    title: "Chi tiết đơn hàng",
  },
];

const DetailOrderPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  const [isEdit, setIsEdit] = useState(false);

  const handleEditCancel = () => {
    setIsEdit(false);
  };

  const handleEditSave = async () => {
    try {
      const payload = {
        ...form.getFieldsValue(["orderStatus", "paymentStatus"]),
      };
      const response = await repositories.order.patch(
        payload,
        currentOrder?._id!
      );
      setCurrentOrder(response.data);
      setIsEdit(false);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await repositories.order.getOne(id!);
        setCurrentOrder(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    getOrder();
  }, [id, navigate]);

  useEffect(() => {
    form.setFieldsValue({
      orderStatus: currentOrder?.orderStatus,
      paymentStatus: currentOrder?.paymentStatus,
    });
  }, [currentOrder, form, isEdit]);

  return (
    <PageWrap
      routes={routes}
      headerActionList={
        isEdit ? (
          <div className="tw-flex tw-items-center tw-gap-4">
            <Button danger onClick={handleEditCancel}>
              Hủy
            </Button>

            <Button type="primary" onClick={handleEditSave}>
              Lưu
            </Button>
          </div>
        ) : (
          <Button type="primary" onClick={() => setIsEdit(true)}>
            Chỉnh sửa
          </Button>
        )
      }>
      <Form form={form} name="control-ref">
        <div className="tw-flex tw-flex-col tw-gap-5 detail-order-wrap tw-mt-2">
          <div className="tw-bg-white tw-p-4 tw-drop-shadow-sm tw-rounded-md">
            <div className="tw-font-semibold tw-text-lg">
              Thông tin đơn hàng
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">ID:</span>
              <span className=" ">{currentOrder?.idReadable}</span>
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Ngày đặt hàng:
              </span>
              <span className=" ">{formatTime(currentOrder?.createdAt)}</span>
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Trạng thái đơn hàng:
              </span>

              {isEdit ? (
                <Form.Item
                  name="orderStatus"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc!",
                    },
                  ]}>
                  <Select
                    style={{ width: 180 }}
                    options={enumObjectList.orderStatus.map((item) => ({
                      ...item,
                      label: item.text,
                    }))}
                  />
                </Form.Item>
              ) : (
                <CustomTag
                  color={
                    getEnumObject.getOrderStatus(currentOrder?.orderStatus!)
                      ?.color
                  }
                  text={
                    getEnumObject.getOrderStatus(currentOrder?.orderStatus!)
                      ?.text
                  }
                />
              )}
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Phương thức thanh toán:
              </span>

              <span className=" ">
                {
                  getEnumObject.getPaymentMethod(currentOrder?.paymentMethod!)
                    ?.text
                }
              </span>
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Trạng thái thanh toán:
              </span>

              {isEdit ? (
                <Form.Item
                  name="paymentStatus"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc!",
                    },
                  ]}>
                  <Select
                    style={{ width: 180 }}
                    options={enumObjectList.paymentStatus.map((item) => ({
                      ...item,
                      label: item.text,
                    }))}
                  />
                </Form.Item>
              ) : (
                <CustomTag
                  color={
                    getEnumObject.getPaymentStatus(currentOrder?.paymentStatus!)
                      ?.color
                  }
                  text={
                    getEnumObject.getPaymentStatus(currentOrder?.paymentStatus!)
                      ?.text
                  }
                />
              )}
            </div>
          </div>

          <div className="tw-bg-white tw-p-4 tw-drop-shadow-sm tw-rounded-md">
            <div className="tw-font-semibold tw-text-lg">
              Thông tin giao hàng
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Họ tên:
              </span>
              <span className=" ">{currentOrder?.fullName}</span>
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Số điện thoại:
              </span>
              <span className=" ">{currentOrder?.phoneNumber}</span>
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Địa chỉ:
              </span>
              <span className=" ">{currentOrder?.address}</span>
            </div>

            <div className="tw-flex tw-items-start tw-gap-1 tw-mt-[6px]">
              <span className="tw-font-medium tw-whitespace-nowrap">
                Ghi chú:
              </span>
              <span>{currentOrder?.note}</span>
            </div>
          </div>

          <div className="tw-bg-white tw-drop-shadow-sm tw-rounded-md tw-overflow-hidden">
            <div className="tw-flex tw-items-center tw-justify-between  tw-p-4 tw-border-0 tw-border-b tw-border-solid tw-border-[#aaaaaa99]">
              <div className="header-wrap info-item">
                <span className="total-title">{`Số lượng: `}</span>
                <span className="total-value tw-text-[#e99746]">
                  {`${currentOrder?.orderItems.length} sản phẩm`}
                </span>
              </div>
              <div className="header-wrap info-item">
                <span className="total-title">{`Thành tiền: `}</span>
                <span className="total-value tw-text-[#e99746]">
                  {`${Number(currentOrder?.totalCost).toLocaleString()}đ`}
                </span>
              </div>
            </div>
            {currentOrder?.orderItems.map((product: IOrderItem) => (
              <div key={product._id} className="detail-order-item">
                <Link
                  className="detail-order-item-link"
                  target="_blank"
                  to={`${routesList.PRODUCT}/${product.productId}`}>
                  <div className="product-info">
                    <div
                      className="product-img"
                      style={{
                        backgroundImage: `url('${getFullPathMedia(
                          product.image!
                        )}')`,
                      }}></div>
                    <div className="product-description">
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">
                        {`${Number(product.price).toLocaleString()}đ x ${
                          product.quantity
                        }`}
                      </div>
                      <div className="product-total-price">
                        {`${(
                          Number(product.price) * product.quantity!
                        ).toLocaleString()}đ`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Form>
    </PageWrap>
  );
};

export default DetailOrderPage;
