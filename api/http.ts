import axios, { AxiosRequestConfig } from 'axios';

const requestHandler = (request: AxiosRequestConfig) => request;
const errorHandler = (error: any) => Promise.reject(error);

const Http = {
  Private: (config?: AxiosRequestConfig, baseUrl?: string) => {
    const instance = axios.create({
      baseURL: baseUrl || process.env.RES_URL,
      timeout: 60000,
      ...(config || {}),
    });

    instance.interceptors.request.use(
      (request) => requestHandler(request),
      (error) => errorHandler(error),
    );

    return instance;
  },

  Public: (config?: AxiosRequestConfig, baseUrl?: string) => {
    const instance = axios.create({
      baseURL: baseUrl || process.env.RES_URL,
      timeout: 60000,
      ...(config || {}),
    });

    instance.interceptors.request.use(
      (request) => requestHandler(request),
      (error) => errorHandler(error),
    );

    return instance;
  },
};

export default Http;
