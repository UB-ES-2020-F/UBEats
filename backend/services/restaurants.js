// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')
const {_createUpdateDynamicQuery} = require('../helpers/helpers')


/**
 * Query for retrieving all the restaurants from the users, restaurants(join) table
 */
function getAllRestaurants()
{
        return pool.query('SELECT users.email,users.name,"CIF" AS cif,street,pass,phone,tipo,url,avaliability,visible,iban,allergens,types.type_id,types.name AS type_name,description FROM users,restaurants,type_restaurants,types WHERE users.email=restaurants.email AND restaurants.email=type_restaurants.rest_id AND type_restaurants.type_id=types.type_id ORDER BY email')
                .then(res => {
                        //check at least one row
                        if(!res.rows[0]) return null

                        var resSpecificRows = []
                        var email_prev = ""
                        res.rows.forEach(row => {
                        if(row.email != email_prev){
                                resSpecificRows.push(
                                {
                                        email: row.email,
                                        name: row.name,
                                        CIF: row.cif,
                                        street: row.street,
                                        pass: row.pass,
                                        phone: row.phone,
                                        tipo: row.tipo,
                                        url: row.url,
                                        avaliability: row.avaliability,
                                        visible: row.visible,
                                        iban: row.iban,
                                        allergens: row.allergens,
                                        types: [{
                                                type_id : row.type_id,
                                                name : row.type_name,
                                                description : row.description
                                        }]
                                })
                                email_prev = row.email
                        } else{
                                resSpecificRows[resSpecificRows.length -1].types.push({
                                        type_id : row.type_id,
                                        name : row.type_name,
                                        description : row.description
                                })
                        }
                        })
                        //console.log(resSpecificRows)
                        return resSpecificRows
                })
                .catch(err => {
                        return {error: err}
                })
}

/**
 * Method that gets all the info from a restaurant in the DB
 * 
 */
async function getRestaurantByID(email){
    return pool.query('SELECT users.email,users.name,"CIF" AS cif,street,pass,phone,tipo,url,avaliability,visible,iban,allergens,types.type_id,types.name AS type_name,description FROM users,restaurants,type_restaurants,types WHERE users.email=$1 AND users.email=restaurants.email AND restaurants.email=type_restaurants.rest_id AND type_restaurants.type_id=types.type_id',[email])
        .then(res => {
                //Check at least one row
                if(!res.rows[0]) return null

                //console.log(res.rows)
                var restaurant = {
                        email: res.rows[0].email,
                        name: res.rows[0].name,
                        CIF: res.rows[0].cif,
                        street: res.rows[0].street,
                        pass: res.rows[0].pass,
                        phone: res.rows[0].phone,
                        tipo: res.rows[0].tipo,
                        url: res.rows[0].url,
                        avaliability: res.rows[0].avaliability,
                        visible: res.rows[0].visible,
                        iban: res.rows[0].iban,
                        allergens: res.rows[0].allergens,
                        types: []

                }

                res.rows.forEach(row => {
                        restaurant.types.push(
                            {
                                type_id : row.type_id,
                                name : row.type_name,
                                description : row.description
                            })
                        })
                //console.log(restaurant)
                return restaurant
        })
        .catch(err => {
                return {error: err}
        })
}

/**
 * Modify the values of a restaurant from the tables restaurant, selected by email
 */
function updateRestaurant(email, values)
{
        const check = _checkRestaurantUpdateParameters(values)

        if(check.err)
                return {error: check.err, errCode: 403}
        
        const query = _createUpdateDynamicQuery(values,'restaurants', 'email') // Update table restaurants via email.
        if(query.error){
                return {error: query.error, errCode: 403}
        }

        return pool.query(query)
                .then((res) => {
                        //console.log(res.rows[0])
                        return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Auxiliary function to check for the parameters of a body
 * This function is called in the context of restaurant update
 * The parameters of a restaurant have constraints that must be
 * checked before an update is possible.
 * This functions checks for this constraints and if any of them
 * is violated, an error string is concatenated with previous errors.
 * Finally, a string with all the errors is returned
 * body is expected to have more than 0 key:value pairs
 */
function _checkRestaurantUpdateParameters(params)
{
        var err_str = ''

        if(params.avaliability && params.avaliability.length == 0)
                err_str = err_str.concat("Avaliability is empty\n")

        if(params.visible && params.visible.length == 0)
                err_str = err_str.concat("'Visible' is empty\n")

        if(params.iban && params.iban.length != 24)
                err_str = err_str.concat("IBAN is not valid\n")

        if(params.allergens && params.allergens.length > 200)
                err_str = err_str.concat("Allergens link exceed the limit of 200 chars\n")


        if(err_str.length > 0)
                return {err: err_str}

        return {all_good: true}
}

/**
 * Method that gets the feedback of a restaurant from the DB
 * 
 */
async function getFeedback(email){

    return pool.query('SELECT rating,explanation,timestamp,name FROM feedbacks,users WHERE feedbacks.cust_id=users.email AND rest_id=$1',[email])
    .then(res =>{
        //console.log(res.rows)
        return res.rows
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that gets the menu: all the items and their types(repeated columns if they have more than one) from a restaurant from the DB
 * 
 */
async function getMenu(email){
    
    const query = format('SELECT items.item_id,title,items.desc,price,types.name,items.cat_id,category FROM items,type_items,types,categories WHERE items.item_id=type_items.item_id AND items.rest_id=%L AND types.type_id=type_items.type_id AND visible =%L AND categories.cat_id=items.cat_id ORDER BY items.item_id',[email],1)
    
    return pool.query(query)
    .then(res =>{

        //check at least one row
        if(!res.rows[0]) return null

        var resSpecificRows = []
        var id_prev = -1
        res.rows.forEach(item => {
            if(item.item_id != id_prev){
                resSpecificRows.push(
                    {
                        item_id : item.item_id,
                        title : item.title,
                        desc : item.desc,
                        price : item.price,
                        cat_id: item.cat_id,
                        category: item.category,
                        types : [item.name]
                    })
                id_prev = item.item_id
            } else{
                resSpecificRows[resSpecificRows.length -1].types.push(item.name)
            }
        })
        //console.log(resSpecificRows)
        return resSpecificRows
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that deletes a type of the restaurant by the type_id and email
 * @param {*} values contains the email and the id
 * @returns 
 */
async function deleteType(values){
    const query = format(`DELETE FROM type_restaurants WHERE type_id=${values.type_id} AND rest_id=%L RETURNING *`,[values.email])
    //console.log(query)
    return pool.query(query)
        .then(res =>{
            //console.log(res.rows[0])
            return res.rows[0] || null
        })
        .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that inserts a type of the restaurant by the type_id and email
 * @param {*} values contains the email and the id
 * @returns 
 */
async function insertType(values){
    const query = format('INSERT INTO type_restaurants VALUES (%L,%L) RETURNING *',[values.type_id],[values.email])
    return pool.query(query)
        .then(res =>{
            return res.rows[0] || null
        })
        .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

module.exports = {getAllRestaurants, getRestaurantByID, updateRestaurant, getFeedback, getMenu, deleteType, insertType }
