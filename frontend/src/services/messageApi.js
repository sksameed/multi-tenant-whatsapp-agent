import api from "./api";

export const getMessages = async () => {
  return await api.get("/messages");
};