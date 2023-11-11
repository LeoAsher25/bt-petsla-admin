import { AxiosInstance } from "axios";
import factories from "src/repositories/factories";
const resource = "/orders";

const orderRepository = (axios: AxiosInstance) => factories(axios)(resource);
export default orderRepository;
