import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const register = (name, email, password, type) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    type
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    }, {"Access-Control-Allow-Origin" : "http://localhost:3000/api/"})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};