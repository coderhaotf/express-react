import type {
  AxiosRequestConfig,
  AxiosResponseHeaders,
  AxiosRequestHeaders,
} from "axios";
import axios from "axios";

export interface ResponseType<T = any> {
  status: string;
  message: string;
  success: boolean;
  data: T;
}

const instance = axios.create({
  baseURL: "/api",
});

const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<ResponseType<T>> => {
  const { data } = await instance.request<ResponseType<T>>({
    ...defaultConfig,
    ...config,
  });
  return data;
};

let defaultConfig: AxiosRequestConfig = {
  transformResponse: [
    (data: any, headers: AxiosResponseHeaders, status?: number) => {
      if (status === 200) {
        try {
          return JSON.parse(data);
        } catch (error) {
          return data;
        }
      }
      return data;
    },
  ],
  transformRequest: (data: any, headers: AxiosRequestHeaders) => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
      headers.set("Authorization", `Bearer ${auth_token}`);
      headers.setContentType("application/json");
    }
    return JSON.stringify(data);
  },
};

const setRequestConfig = (config: AxiosRequestConfig = {}) => {
  defaultConfig = { ...defaultConfig, ...config };
};

export { request, setRequestConfig };
