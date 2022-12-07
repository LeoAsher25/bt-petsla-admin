import { AxiosInstance } from "axios";

const factories = (axios: AxiosInstance) => (resource: string) => ({
  create(payload: any, config: any = {}) {
    return axios.post(`${resource}`, payload, config);
  },

  post(payload: any, url?: string, config: any = {}) {
    return axios.post(
      url ? `${resource}/${url}` : `${resource}`,
      payload,
      config
    );
  },

  getMany(config: any = {}) {
    return axios.get(`${resource}`, config);
  },

  getOne(id: string | number, config: any = {}) {
    return axios.get(`${resource}/${id}`, config);
  },

  get(url?: string, config: any = {}) {
    return axios.get(url ? `${resource}/${url}` : `${resource}`, config);
  },

  update(payload: any, id: string, config: any = {}) {
    return axios.put(`${resource}/${id}`, payload, config);
  },

  put(payload: any, url?: string, config: any = {}) {
    return axios.put(
      url ? `${resource}/${url}` : `${resource}`,
      payload,
      config
    );
  },

  patch(payload: any, url?: string, config: any = {}) {
    return axios.patch(
      url ? `${resource}/${url}` : `${resource}`,
      payload,
      config
    );
  },

  delete(id: string, config: any = {}) {
    return axios.delete(`${resource}/${id}`, config);
  },
});

export default factories;
