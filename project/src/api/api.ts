import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://11.react.pages.academy/wtw',
  timeout: 5000,
});

export default baseApi;
