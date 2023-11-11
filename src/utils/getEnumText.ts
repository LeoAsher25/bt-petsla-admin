import { EnumObject, EnumObjectType } from "src/types/commonTypes";
import { EOrderStatus, EPaymentStatus } from "src/types/productTypes";

const getEnumObject = {
  getOrderStatus(value: number): EnumObject {
    const orderStatus: EnumObjectType = {
      PENDING: {
        text: "Chờ xác nhận",
        value: 0,
        key: "UNPAID",
      },
      SHIPPING: {
        text: "Đang giao",
        value: 1,
        key: "PAID",
      },
      DELIVERED: {
        text: "Đã giao",
        value: 2,
        key: "REFUNDING",
      },
      CANCELLED: {
        text: "Đã hủy",
        value: 3,
        key: "REFUNDED",
      },
    };

    return orderStatus[EOrderStatus[value]];
  },

  getPaymentStatus(value: number): EnumObject {
    const paymentStatus: EnumObjectType = {
      UNPAID: {
        text: "Chưa thanh toán",
        value: 0,
        key: "UNPAID",
      },
      PAID: {
        text: "Đã thanh toán",
        value: 1,
        key: "PAID",
      },
      REFUNDING: {
        text: "Đang hoàn tiền",
        value: 2,
        key: "REFUNDING",
      },
      REFUNDED: {
        text: "Đã thanh toán",
        value: 3,
        key: "REFUNDED",
      },
    };

    return paymentStatus[EPaymentStatus[value]];
  },
};
export default getEnumObject;
