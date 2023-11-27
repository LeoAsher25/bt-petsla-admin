import productCategoryRepository from "src/repositories/productCategory";
import { axiosInstance } from "src/utils/axiosInstance";
import { AxiosInstance } from "axios";
import authRepository from "./auth";
import imageRepository from "./image";
import productRepository from "./product";
import orderRepository from "src/repositories/order";
import userRepository from "./user";

const repositories = (axios: AxiosInstance) => ({
  auth: authRepository(axios),
  user: userRepository(axios),
  product: productRepository(axios),
  image: imageRepository(axios),
  order: orderRepository(axios),
  productCategory: productCategoryRepository(axios),
});

export default repositories(axiosInstance);
