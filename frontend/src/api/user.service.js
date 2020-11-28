import axios from "axios";
import authHeader from "./auth-header";

const API_URL_DEV = "http://localhost:3000/api/users/";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/users";
const API_URL = API_URL_DEV;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

{/** 
const setUserInfo = (email, name, cif, street, phone, tipo) => {
  return axios.put(API_URL + "register", {
    name,
    email,
    password,
    type
  }, {"Access-Control-Allow-Origin" : API_URL}).then((response) => {
    if (response.data.accessToken) {
      logout();
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Info recieved, now in the store");
    }
    return response.data;
  });
};

*/}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
