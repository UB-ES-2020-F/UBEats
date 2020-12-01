import axios from "axios";

const API_URL_DEV = "http://localhost:3000/api/restaurants";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/http://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurants";
const API_URL = API_URL_BUILD;

//Get all restaurants.
const getAll = () => {
    return axios.get(API_URL, {
    }).then((response) => {
      console.log('all rest recieved');
      return response.data['rest'];
    });
};

//Get all restaurants and favourites.
const getAllLogged = (user_id) => {
    return axios.get(API_URL+'/user/'+user_id, {
    }).then((response) => {
      console.log('logged, all rest recieved');
      return response.data['rest'];
    });
};

//Get all restaurant types {type_id, type_name}
const getRestaurantsByType = (type_id) =>{
  return axios.get(API_URL+'/type/'+type_id, {
  }).then((response) => {
    console.log('all rest types recieved');
    return response.data['rest'];
  });
};

const postFav = (rest_id, user_id) => {
  //mirar si es fa a /restaurant o a /restaurants
  //mirar si hi ha body (payload) o no.
  return axios.post(API_URL+`/${rest_id}/favourite/${user_id}`, {
  }).then(() => {
    console.log('fav post done');
  });
};

const getRestaurant = (rest_id) => {
    return axios.get(API_URL+'/' + rest_id, {
    }).then((response) => {
      console.log('Restaurant info received');
      return response.data;
    });
};

const getRestaurantMenu = (rest_id) => {
    return axios.get(API_URL +'/menu/'+ rest_id, {
    }).then((response) => {
        console.log('Restaurant menu received');
        return response.data['menu'];
    });
};

export default {
    getAll,
    getAllLogged,
    postFav,
    getRestaurantsByType,
    getRestaurantMenu,
    getRestaurant,
};
