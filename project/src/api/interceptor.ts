import baseApi from './api';
import { getToken } from './token';


export const init = (incrementFn: () => void, decrementFn: () => void) => {
  baseApi.interceptors.request.use((config) => {
    incrementFn();
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  }, (error) => {
    decrementFn();
    return Promise.reject(error);
  });

  baseApi.interceptors.response.use((response) => {
    decrementFn();
    return response;
  }, (error) => {
    decrementFn();
    return Promise.reject(error);
  });
};
