// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')


/**
 * Method that gets the feedback of a restaurant from the DB
 * 
 */
async function feedback(email){
    return pool.query('SELECT rating,explanation,timestamp,name FROM feedbacks,users WHERE feedbacks.cust_id=users.email AND rest_id=$1',[email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that gets the types of a restaurant from the DB
 * 
 */
async function getTypes(email){
    return pool.query('SELECT name,description FROM types,type_restaurants WHERE rest_id = $1 AND types.type_id=type_restaurants.type_id',[email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that gets the menu: all the items and their types(repeated columns if they have more than one) from a restaurant from the DB
 * 
 */
async function menu(email){
    const query = format('SELECT items.item_id,title,items.description,price,name FROM items,type_items,types WHERE items.item_id=type_items.item_id AND rest_id=$1 AND types.type_id=type_items.type_id AND visible = %s ORDER BY items.item_id',[email],'1')
    return pool.query(query)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}


module.exports = {feedback, getTypes, menu}