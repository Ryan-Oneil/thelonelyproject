import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAuth } from "firebase/auth";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const AUTH_HEADER = "X-Authorization-Firebase";

const baseApi = axios.create({
  baseURL: BASE_URL,
});

type ApiError = {
  timestamp: string;
  status: number;
  error: string;
  path: string;
};

baseApi.interceptors.request.use(
  async (config) => {
    // @ts-ignore
    config.headers[AUTH_HEADER] = await getAuth()?.currentUser?.getIdToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiGetCall = async (
  endpoint: string,
  options?: AxiosRequestConfig
) => {
  return baseApi.get(endpoint, options);
};

export const apiPostCall = async (
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig
) => {
  return baseApi.post(endpoint, data, options);
};

export const apiPutCall = async (endpoint: string, data?: any) => {
  return baseApi.put(endpoint, data);
};

export const apiDeleteCall = async (endpoint: string) => {
  return baseApi.delete(endpoint);
};

export const getApiError = (error: AxiosError<ApiError>) => {
  if (error.response) {
    return error.response.data.error;
  } else if (error.request) {
    return "Services are unreachable";
  } else {
    return error.message;
  }
};
