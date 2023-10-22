import axios from 'axios';
import { Environment } from '../../environment';
import { responseInterceptor, errorInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token)
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };
