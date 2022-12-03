import { AxiosResponse } from "axios";

export enum ERequestStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

export enum ESortType {
  NAME,
  PRICE,
}

export enum ESortDirect {
  DESCENDING,
  ASCENDING,
}

export interface ErrorResponse {
  code?: string;
  message: string;
}

export interface IRouteBreadCrumb {
  to: string;
  title: string;
}
