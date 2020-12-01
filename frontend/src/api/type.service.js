import axios from "axios";

const API_URL_DEV = "http://localhost:3000/api/types";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurants";
const API_URL_HEROKU = "https://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurants";
const API_URL = API_URL_HEROKU;


//Get all restaurant types {type_id, type_name}
const getTypes = () =>{
  return axios.get(API_URL, {
  }).then((response) => {
    console.log('all rest types recieved');
    return response.data;
  });
};


export default {
    getTypes,
};
