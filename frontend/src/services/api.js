import axios from "axios";

const api = axios.create({
  baseURL: "https://multi-tenant-whatsapp-agent-e505.onrender.com/api",
});

export default api;