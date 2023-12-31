import { AxiosInstance } from "axios";
import factories from "src/repositories/factories";
const resource = "/products";

const productRepository = (axios: AxiosInstance) => factories(axios)(resource);
export default productRepository;
