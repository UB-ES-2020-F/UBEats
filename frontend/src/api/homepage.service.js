import axios from "axios";

const API_URL_DEV = "http://localhost:3000/api/restaurants";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurants";
const API_URL = API_URL_DEV;


//Send POST to API_URL/register with name, email, password, type.
const getAll = (rest_id) => {
    return axios.get(API_URL, {
    }).then((response) => {
      console.log('all rest recieved');
      return response.data['rest'];
    });
};

const getRestaurant = (rest_id) => {
    return axios.get(API_URL+'/' + rest_id, {
    }).then((response) => {
      console.log('rest recieved');
      return response.data;
    });
};

const getRestaurantMenu = (rest_id) => {
    return axios.get(API_URL +'/menu/'+ rest_id, {
    }).then((response) => {
        console.log('rest menu recieved');
        return response.data['menu'];
    });
};
export default {
    getRestaurant,
    getAll,
    getRestaurantMenu,
};
