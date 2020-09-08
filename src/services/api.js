import axios from "axios";
import { getToken } from '../auth'

const api = axios.create({
  // baseURL: "http://api-faciliteai-com-br.umbler.net/"
  baseURL: "http://localhost:3333"
});

api.interceptors.request.use((request) => {
  const token = getToken()
  if(token) {
    request.headers.Authorization = `Bearer ${token}`;
    request.headers['x-access-token'] = `${token}`;
  }
  
  return request;
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
      console.log(err);
      if (err.response.status === 401) {
          window.location = '/login'
      }
      throw err;
  },
);

export default api;
