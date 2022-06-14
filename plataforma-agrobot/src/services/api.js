import axios from "axios";

export const baseUrlServer = "http://200.201.88.126:3001/api/";

const api = axios.create({
  baseURL: baseUrlServer,
});

export default api;
