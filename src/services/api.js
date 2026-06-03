import axios from "axios";

const api = axios.create({
  baseURL: "http://13.48.59.189:1802/api/v1",
});

export default api;
