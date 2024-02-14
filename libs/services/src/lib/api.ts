import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  HttpStatusCode,
} from 'axios';
import { toast } from 'react-toastify';

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

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && !!StatusCodeMapping[error.response.status]) {
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
