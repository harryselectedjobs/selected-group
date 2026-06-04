import axios from "axios";

const api = axios.create({
  baseURL: "https://www.selected.jobs/api/api/v1",
});

export default api;
