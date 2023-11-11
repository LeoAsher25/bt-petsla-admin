import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

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

export interface IErrorResponse extends AxiosError {
  statusCode?: number;
  statusText?: string;
}

export interface IRouteBreadCrumb {
  to: string;
  title: string;
}

export type EnumObjectType = Record<string, EnumObject>;

export interface EnumObject {
  text?: string;
  value?: any;
  key?: string;
  color?: string;
}
