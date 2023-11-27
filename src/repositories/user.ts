import { AxiosInstance } from "axios";
import factories from "src/repositories/factories";
const resource = "/users";

const userRepository = (axios: AxiosInstance) => factories(axios)(resource);
export default userRepository;
