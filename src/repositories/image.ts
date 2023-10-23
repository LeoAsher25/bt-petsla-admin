import { AxiosInstance } from "axios";
import factories from "src/repositories/factories";
const resource = "/images";

const imageRepository = (axios: AxiosInstance) => factories(axios)(resource);
export default imageRepository;
