import axios from 'axios';

const serverUrl = 'https://...';
const baseApi = axios.create({
  baseURL: serverUrl,
});

export default baseApi;
