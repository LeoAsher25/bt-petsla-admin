import { AxiosInstance } from "axios";
import factories from "src/repositories/factories";
const resource = "/auth";

const authRepository = (axios: AxiosInstance) => factories(axios)(resource);
export default authRepository;
