import axios, { AxiosRequestConfig } from "axios";

interface axiosApiProps {
  url: string;
  options: AxiosRequestConfig;
}
const base = "https://api.example.com";
const gen = "https://api.example.com/gen";
const axiosApi = ({ url, options }: axiosApiProps) => {
  const instance = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi({ url: base, options: {} });
export const genInstance = axiosApi({ url: gen, options: {} });
