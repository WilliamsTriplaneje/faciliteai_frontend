import axios from "axios";
const api = axios.create({
  // baseURL: "http://api-faciliteai-com-br.umbler.net/"
  baseURL: "http://localhost:3333"
});
export default api;
