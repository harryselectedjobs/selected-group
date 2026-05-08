import axios from "axios";

const api = axios.create({
  baseURL: "http://13.61.16.106:1802/api/v1",
});

export default api;