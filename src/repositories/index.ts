import productCategoryRepository from "src/repositories/productCategory";
import { axiosInstance } from "src/utils/axiosInstance";
import { AxiosInstance } from "axios";
import authRepository from "./auth";
import imageRepository from "./image";
import productRepository from "./product";

const repositories = (axios: AxiosInstance) => ({
  auth: authRepository(axios),
  product: productRepository(axios),
  image: imageRepository(axios),
  productCategory: productCategoryRepository(axios),
});

export default repositories(axiosInstance);
