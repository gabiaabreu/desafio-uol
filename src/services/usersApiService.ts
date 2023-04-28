import axios from "axios";
import { UserType } from "../types";

const urlApi = "http://localhost:3000/users";

export function getAllUsers() {
  return axios.get(urlApi).then((response) => {
    return response.data;
  });
}

export function getUsersByPage(page: number) {
  return axios.get(urlApi + `?_page=${page}&_limit=5`).then((response) => {
    return response.data;
  });
}

export function getUserById(id: string) {
  const urlById = urlApi + "/" + id;
  return axios.get(urlById).then((response) => {
    return response.data;
  });
}

export function postUser(user: UserType) {
  const postUser = {
    ...user,
  };
  return axios.post(urlApi, postUser).then((response) => {
    return response.data;
  });
}

export function editUser(id: string, user: UserType) {
  return axios.put(`${urlApi}/${id}`, user).then((response) => {
    return response.data;
  });
}

export function deleteUser(id: string) {
  return axios.delete(`${urlApi}/${id}`);
}
