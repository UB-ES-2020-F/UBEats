import axios from "axios";

const API_URL_DEV = "http://localhost:3000/api/";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/";
const API_URL_HEROKU = "http://ub-gei-es-ubeats-clone.herokuapp.com/api/";
const API_URL = API_URL_BUILD;

//Send POST to API_URL/register with name, email, password, type.
const register = (name, email, password, type) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    type
  }, {"Access-Control-Allow-Origin" : API_URL}).then((response) => {
    if (response.data.accessToken) {
      logout();
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Register user recieved, now in the store");
    }
    return response.data;
  });
};
//Send post to API_URL/login with email, password. Wait for response and set localStorage 'user' as the response.
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    }, {"Access-Control-Allow-Origin" : API_URL})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Log in user recieved, now in the store");
      }
      return response.data;
    });
};
//Remove user from locarStorage
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
