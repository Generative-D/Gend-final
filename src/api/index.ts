import axios, { AxiosRequestConfig } from "axios";

interface axiosApiProps {
  url: string;
  options: AxiosRequestConfig;
}

//const gen = import.meta.env.VITE_API_ENDPOINT;
const gen = "https://gendtest.store/";
const axiosApi = ({ url, options }: axiosApiProps) => {
  const instance = axios.create({
    baseURL: url,
    // timeout: 10000,
    headers: { "X-Custom-Header": "foobar" },
    ...options,
  });
  return instance;
};

export const genInstance = axiosApi({ url: gen, options: {} });
