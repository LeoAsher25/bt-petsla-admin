export interface ILoginRequestData {
  username: string;
  password: string;
}

export interface IRegisterRequestData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface ILoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponseError {
  detail: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  email: string;
  role?: EUserRole;

  _id?: string;
  gender?: EGender;
  isAdmin?: boolean;
  address?: string;
  phoneNumber?: string;
  password?: string;
}

export interface IOrderInfo {
  _id?: string;
  name: string;

  address: string;
  phoneNumber: string;
  note?: string;
}

export enum EGender {
  MALE,
  FEMALE,
  OTHER,
  UNKNOWN,
}

export enum EUserRole {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  CUSTOMER = "CUSTOMER",
}
