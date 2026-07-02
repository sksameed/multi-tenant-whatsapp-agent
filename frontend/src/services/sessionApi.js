import api from "./api";

export const getSessions = async () => {
  return await api.get("/sessions");
};