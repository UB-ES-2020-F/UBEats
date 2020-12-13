import axios from "axios";
import authHeader from "./auth-header";

const API_URL_DEV = "http://localhost:3000/api/user/";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/users";
const API_URL_HEROKU = "https://ub-gei-es-ubeats-clone.herokuapp.com/api/users";
const API_URL = API_URL_HEROKU;

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


const setUserInfo = (databaseEmail, street, tipo, useremail) => {
    console.log("Dentro de la funcion");
    console.log(street);
    console.log(tipo);
    axios.put(API_URL + databaseEmail, { 
      type : tipo,
      street: street,
      email: useremail
    }).then((response) => {
      console.log("PUT con exito");
      console.log(response.data);
    }).catch((err) => {console.log(err)});
};


export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  setUserInfo,
};
