import axios from "axios";
import { getToken } from "../auth";
import { API_URL } from '../config/Constants'

console.log(`Configurando API com a url: ${API_URL}`)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

api.interceptors.request.use((request) => {
  const token = getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
    request.headers["x-access-token"] = `${token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => {
    if (response.headers["content-type"].includes("application/json")) {
      return response;
    }
    console.log("Rejeitando response");
    Promise.reject(response);
  },
  (err) => {
    try {
      console.log(err);
      if (err.response.status === 401) {
        window.location = "/auth/login";
      }
    } catch(e) {
      throw err;
    }
  }
);

export default api;
