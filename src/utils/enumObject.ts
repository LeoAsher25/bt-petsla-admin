import { EPaymentMethod } from "../types/productTypes";
import { EnumObject, EnumObjectType } from "src/types/commonTypes";
import { EOrderStatus, EPaymentStatus } from "src/types/productTypes";

const orderStatus: EnumObject[] = [
  {
    text: "Chờ xác nhận",
    value: EOrderStatus.PENDING,
    key: "PENDING",
    color: "#d46b08",
  },
  {
    text: "Đang giao",
    value: EOrderStatus.SHIPPING,
    key: "SHIPPING",
    color: "#0958d9",
  },
  {
    text: "Đã giao",
    value: EOrderStatus.DELIVERED,
    key: "DELIVERED",
    color: "#389e0d",
  },
  {
    text: "Đã hủy",
    value: EOrderStatus.CANCELLED,
    key: "CANCELLED",
    color: "#cf1322",
  },
];
const paymentStatus: EnumObject[] = [
  {
    text: "Chưa thanh toán",
    value: EPaymentStatus.UNPAID,
    key: "UNPAID",
    color: "#d48806",
  },
  {
    text: "Đã thanh toán",
    value: EPaymentStatus.PAID,
    key: "PAID",
    color: "#389e0d",
  },
  {
    text: "Đang hoàn tiền",
    value: EPaymentStatus.REFUNDING,
    key: "REFUNDING",
    color: "#13c2c2",
  },
  {
    text: "Đã thanh toán",
    value: EPaymentStatus.REFUNDED,
    key: "REFUNDED",
    color: "#722ed1",
  },
];

const paymentMethods: EnumObject[] = [
  {
    text: "Thanh toán khi nhận hàng",
    value: EPaymentMethod.COD,
  },
  {
    text: "Thanh toán qua MoMo",
    value: EPaymentMethod.MOMO,
  },
];

export const enumObjectList = {
  orderStatus,
  paymentStatus,
  paymentMethods,
};

const getEnumObject = {
  getOrderStatus(value: EOrderStatus): EnumObject | undefined {
    return orderStatus.find((item) => item.value === value);
  },

  getPaymentStatus(value: EPaymentStatus): EnumObject | undefined {
    return paymentStatus.find((item) => item.value === value);
  },

  getPaymentMethod(value: EPaymentMethod): EnumObject | undefined {
    return paymentMethods.find((item) => item.value === value);
  },
};
export default getEnumObject;
