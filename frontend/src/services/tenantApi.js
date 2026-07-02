import api from "./api";

export const getTenants = async () => {
  return await api.get("/tenants");
};