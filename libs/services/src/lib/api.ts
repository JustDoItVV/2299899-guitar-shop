import axios, {
  AxiosError,
  AxiosInstance,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';

import { BACKEND_URL, REQUEST_TIMEOUT } from '@guitar-shop/consts';

import { getToken } from './token';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [HttpStatusCode.BadRequest]: true,
  [HttpStatusCode.Unauthorized]: true,
  [HttpStatusCode.NotFound]: true,
};

export const createApiService = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && !!StatusCodeMapping[error.response.status]) {
        const detailMessage = error.response.data;
        console.log(detailMessage);
      }

      throw error;
    }
  );

  return api;
};
