import axios from "axios";
import { getToken } from "../auth";

const api = axios.create({
  // baseURL: "http://api-faciliteai-com-br.umbler.net/"
  baseURL: "http://localhost:3333",
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
