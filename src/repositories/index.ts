import { axiosInstance } from "src/utils/axisInstance";
import { AxiosInstance } from "axios";
import authRepository from "./auth";
import productRepository from "./product";
const repositories = (axios: AxiosInstance) => ({
  auth: authRepository(axios),
  product: productRepository(axios),
});

export default repositories(axiosInstance);
