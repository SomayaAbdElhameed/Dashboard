import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};


//////////////////CRUD Operations///////////////

export const addUser = async (user) => {
  const response = await axios.post(
    `${BASE_URL}/users`,
    user
  );

  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${BASE_URL}/users/${id}`);
};

export const updateUser = async (id, user) => {
  const response = await axios.put(
    `${BASE_URL}/users/${id}`,
    user
  );

  return response.data;
};