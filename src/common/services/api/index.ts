import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import merge from 'lodash.merge';

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (options?: AxiosRequestConfig) => {
  const createInternalClient = () => {
    const defaultOptions: AxiosRequestConfig = {
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const mergedOptions = merge({}, defaultOptions, options);
    const client = axios.create(mergedOptions);

    client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      config.headers['X-API-KEY'] = token;
      merge({}, defaultOptions.headers, config.headers);
      return config;
    });

    return client;
  };

  const createExternalClient = (config: AxiosRequestConfig) => {
    const defaultOptions: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const mergedOptions = merge({}, defaultOptions, config);

    return axios.create(mergedOptions);
  };

  return {
    client: createInternalClient(),
    createExternalClient,
  };
};
