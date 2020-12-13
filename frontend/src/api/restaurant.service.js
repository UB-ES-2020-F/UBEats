import axios from "axios";

const API_URL_DEV = "http://localhost:3000/api/restaurants";
const API_URL_BUILD = "https://cors-anywhere.herokuapp.com/https://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurants";
const API_URL_HEROKU = "https://ub-gei-es-ubeats-clone.herokuapp.com/api/restaurants";
const API_URL = API_URL_DEV;

//Get all restaurants.
const getAll = () => {
    return axios.get(API_URL, {
    }).then((response) => {
      return response.data['rest'];
    });
};

//Get all restaurants and favourites.
const getAllLogged = (user_id) => {
    return axios.get(API_URL+'/user/'+user_id, {
    }).then((response) => {
      return response.data['rest'];
    });
};

//Get all restaurant types {type_id, type_name}
const getRestaurantsByType = (type_id) =>{
  return axios.get(API_URL+'/type/'+type_id, {
  }).then((response) => {
    return response.data['rest'];
  });
};

const postFav = (rest_id, user_id) => {
  return axios.post(API_URL+`/${rest_id}/favourite/${user_id}`, {
  }).then(() => {
  });
};

const getRestaurant = (rest_id) => {
    return axios.get(API_URL+'/' + rest_id, {
    }).then((response) => {
      return response.data;
    });
};

const getRestaurantMenu = (rest_id) => {
    return axios.get(API_URL +'/menu/'+ rest_id, {
    }).then((response) => {
        return response.data['menu'];
    });
};

///restaurants/name/:rest_substr
const getRecommendedRestaurants = (rest_substr) => {
  return axios.get(API_URL +'/name/'+rest_substr, {
  }).then((response) => {

      console.log({'Restaurant recommendations recieved' : response.data['rests'], 'url request': API_URL +'/name/'+ rest_substr});
      return response.data['rests'];
  });
};

export default {
    getAll,
    getAllLogged,
    postFav,
    getRestaurantsByType,
    getRestaurantMenu,
    getRestaurant,
    getRecommendedRestaurants,
};