import axios from "axios";

const API_URL_DEV = "http://localhost:3000/api/restaurant/";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/https://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurant/";
const API_URL_HEROKU = "https://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurant/";
const API_URL = API_URL_HEROKU ;

//Send POST to API_URL/register with name, email, password, type.
const getMenu = (rest_id) => {
    return axios.get(API_URL + `${rest_id}/items`, {
    }).then((response) => {
      console.log('menu recieved');
      return response.data['items'];
    });
};

const login = (email, password) => {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      }, {"Access-Control-Allow-Origin" : API_URL})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("user recieved, now in the store");
        }
        return response.data;
      });
  };
export default {
    getMenu,
};
