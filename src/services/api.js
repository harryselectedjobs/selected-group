import axios from "axios";

const api = axios.create({
  baseURL: "http://3.109.182.15:1802/api/v1",
});

export default api;
