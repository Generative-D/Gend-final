import axios, { AxiosRequestConfig } from "axios";

interface axiosApiProps {
  url: string;
  options: AxiosRequestConfig;
}

const base = "http://172.30.1.88:3456";
const gen = import.meta.env.VITE_API_ENDPOINT;
const axiosApi = ({ url, options }: axiosApiProps) => {
  const instance = axios.create({
    baseURL: url,
    // timeout: 10000,
    headers: { "X-Custom-Header": "foobar" },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi({ url: base, options: {} });
export const genInstance = axiosApi({ url: gen, options: {} });
