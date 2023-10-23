import { AxiosInstance } from "axios";
import factories from "src/repositories/factories";
const resource = "/product-categories";

const productCategoriesRepository = (axios: AxiosInstance) =>
  factories(axios)(resource);
export default productCategoriesRepository;
