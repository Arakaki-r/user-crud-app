import api from "../api/axios";

export const getUsers = () => {
  return api.get("/users");
};

export const createUser = (user) => {
  return api.post("/users", user);
};

export const updateUser = (id, user) => {
  return api.put(`/users/${id}`, user);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};