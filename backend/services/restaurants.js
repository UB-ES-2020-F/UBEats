// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')


/**
 * Query for retrieving all the restaurants from the users, restaurants(join) table
 */
function getAllRestaurants()
{
        return pool.query('SELECT users.email,name,"CIF",street,phone,url,avaliability,visible,iban,allergens FROM users,restaurants WHERE users.email=restaurants.email')
                .then(res => {
                        return res.rows
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
    return pool.query('SELECT users.email,name,"CIF",street,pass,phone,tipo,url,avaliability,visible,iban,allergens FROM users,restaurants WHERE users.email=$1 AND users.email=restaurants.email',[email])
        .then(res => {
                // should ONLY be one match
                return res.rows[0] || null
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
        //console.log(check)
        if(check.err)
                return {error: check.err, errCode: 403}

        const query = _createUpdateDynamicQuery(values)
        if(query.error)
                return {error: query.error, errCode: 403}

        return pool.query(query)
                .then((res) => {
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
 * Auxiliary function that builds a dynamic query
 * for SQL with the key:values of an object
 * body is expected to have more than 0 key:value pairs
 */
function _createUpdateDynamicQuery(body)
{
        //console.log(body)
        const {email} = body
        delete body.email

        var body_size = Object.keys(body).length;
        if(body_size == 0)
                return {"error": "body is empty"}

        var counter = 0;

        var dynamicQuery = 'UPDATE restaurants SET'
        for(const key in body)
        {
                //console.log(key)
                dynamicQuery = dynamicQuery.concat(` "${key}" = `)
                //if value is string, add a '
                if(typeof body[key] == "string")
                        dynamicQuery = dynamicQuery.concat('\'')
                dynamicQuery = dynamicQuery.concat(`${body[key]}`)
                //if value is string, add a '
                if(typeof body[key] == "string")
                        dynamicQuery = dynamicQuery.concat('\'')

                //if keys is not the last, add a comma separator
                if(body_size > 1 && ++counter < body_size)
                        dynamicQuery = dynamicQuery.concat(",")
        }
        dynamicQuery = dynamicQuery.concat(` WHERE email = ${email} RETURNING *`)

        //console.log(dynamicQuery)

        return dynamicQuery
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
 * Method that gets the types of a restaurant from the DB
 * 
 */
async function getTypes(email){
    
    return pool.query('SELECT name,description FROM types,type_restaurants WHERE rest_id = $1 AND types.type_id=type_restaurants.type_id',[email])
    .then(res =>{
        return res.rows
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that gets the menu: all the items and their types(repeated columns if they have more than one) from a restaurant from the DB
 * 
 */
async function getMenu(email){
    
    const query = format('SELECT items.item_id,title,items.desc,price,types.name FROM items,type_items,types WHERE items.item_id=type_items.item_id AND rest_id=%L AND types.type_id=type_items.type_id AND visible = %L ORDER BY items.item_id',[email],1)
    
    return pool.query(query)
    .then(res =>{
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
    const query = format('DELETE FROM type_restaurants WHERE type_id=%L AND rest_id=%L RETURNING *',[values.type_id],[values.email])
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

module.exports = {getAllRestaurants, getRestaurantByID, updateRestaurant, getFeedback, getTypes, getMenu, deleteType, insertType }
