import axios from "axios";

const api = axios.create({
  baseURL: "https://api.selected.jobs/api/v1",
});

export default api;
