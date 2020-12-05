// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')
const {_createUpdateDynamicQuery} = require('../helpers/helpers')


/**
 * Query for retrieving all the restaurants from the users, restaurants(join) table
 * This method is used only for non-logged users.
 */
function getAllRestaurants()
{
        var query = format(`    SELECT
                                        restaurants.email, restaurants.avaliability, restaurants.visible, restaurants.iban, restaurants.allergens, 
                                        users.name, users."CIF",  users.street, users.phone, users.url, 
                                        type_restaurants.type_id, "types"."name" as type_name, "types".description as type_desc  
                                FROM restaurants LEFT JOIN users ON users.email = restaurants.email
                                
                                LEFT JOIN type_restaurants ON type_restaurants.rest_id = restaurants.email 
                                LEFT JOIN "types" ON "types".type_id = type_restaurants.type_id`)

        return pool.query(query)
                .then(res => {
                        return res.rows
                })
                .catch(err => {
                        return {error: err}
                })
}

/**
 * Query for retrieving all the restaurants from a particular user ( favourites)
 * This method is used only for logged-in users.
 */
function getAllRestaurantsByUser(userId)
{       
        var query = format(`    SELECT
                                        restaurants.email, restaurants.avaliability, restaurants.visible, restaurants.iban, restaurants.allergens, 
                                        users.name, users."CIF", users.street, users.phone, users.url, 
                                        type_restaurants.type_id, "types"."name" as type_name, "types".description as type_desc,
                                        favourites.cust_id as favourite  
                                FROM restaurants LEFT JOIN users ON users.email = restaurants.email

                                LEFT JOIN type_restaurants ON type_restaurants.rest_id = restaurants.email 
                                LEFT JOIN "types" ON "types".type_id = type_restaurants.type_id
                                LEFT JOIN favourites ON favourites.rest_id = restaurants.email and favourites.cust_id = %L`, userId)
        return pool.query(query)
                .then(res => {
                        for (let r_id in res.rows){
                                //res.rows[r_id].type = {} 
                                res.rows[r_id].type = {...res.rows[r_id].type,
                                        id : res.rows[r_id].type_id,
                                        name : res.rows[r_id].type_name,
                                        description : res.rows[r_id].type_desc
                                }
                                delete res.rows[r_id].type_id
                                delete res.rows[r_id].type_name
                                delete res.rows[r_id].type_desc
                                if (res.rows[r_id].favourite === null) res.rows[r_id].favourite = 0
                                else res.rows[r_id].favourite = 1
                        }
                        return res.rows
                })
                .catch(err => {
                        
                        return {error: err}
                })
}

/**
 * Query for retrieving all the restaurants from a concrete type ( Example : a sushi , id = 1, restaurants)
 * This method is general
 */
function getAllRestaurantsByType(type_id)
{       
        var query = format(`    SELECT
                                        restaurants.email, restaurants.avaliability, restaurants.visible, restaurants.iban, restaurants.allergens, 
                                        users.name, users."CIF", users.street, users.phone, users.url, 
                                        type_restaurants.type_id, "types"."name" as type_name, "types".description as type_desc 
                                FROM restaurants 

                                LEFT JOIN users ON users.email = restaurants.email
                                LEFT JOIN type_restaurants ON type_restaurants.rest_id = restaurants.email 
                                LEFT JOIN "types" ON "types".type_id = type_restaurants.type_id
                                WHERE type_restaurants.type_id = %L`, type_id)
        return pool.query(query)
                .then(res => {
                        for (let r_id in res.rows){
                                //res.rows[r_id].type = {} 
                                res.rows[r_id].type = {...res.rows[r_id].type,
                                        id : res.rows[r_id].type_id,
                                        name : res.rows[r_id].type_name,
                                        description : res.rows[r_id].type_desc
                                }
                                delete res.rows[r_id].type_id
                                delete res.rows[r_id].type_name
                                delete res.rows[r_id].type_desc
                        }
                        return res.rows
                })
                .catch(err => {
                        
                        return {error: err}
                })
}

/*
 * Function to return a list of restaurants that their names
 * match a certain substring. If no restaurants are found an
 * empty list is returned
 */
function getAllRestaurantsByNameSubstring(rest_substr)
{
        //Create the reg exp for the query
        //this regexp matches anything in front, even nothing, and anything in back, even nothing, and the substring in the middle
        const rest_substr_regex = '%'.concat(rest_substr, '%')
        console.log(rest_substr_regex)

        const query = format("SELECT users.email, users.name FROM users WHERE users.tipo = 'restaurant' AND users.name LIKE %L", rest_substr_regex)
        //console.log(query)
        return pool.query(query)
                .then(res => {
                        //console.log(res.rows)
                        return res.rows
                })
                .catch(err => {
                        //console.log(res.rows)
                        return []
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
 * Method that gets the types of a restaurant from the DB
 * 
 */
async function getAllTypes(){
        return pool.query('SELECT type_id, name as type_name, description as type_desc FROM types')
        .then(res =>{
            return res.rows
        })
        .catch(err => { return {error: `${err} specific`, errCode : 500}}) 
    }
/**

 * Method that gets the menu: all the items and their types(repeated columns if they have more than one) from a restaurant from the DB
 * 
 */
async function getMenu(email){
    
    const query = format('SELECT items.item_id,title,items.desc,price,items.cat_id,items.url,category FROM items,categories WHERE items.rest_id=%L AND categories.cat_id=items.cat_id ORDER BY items.item_id',[email])
    
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
                        url : item.url
                    })
                id_prev = item.item_id
            } else{
                resSpecificRows[resSpecificRows.length -1].types.push(item.name)
            }
        })
        let categories = {}
        for (let it of resSpecificRows){
                if (categories[it.category]){
                        categories[it.category].push(it)
                }else {
                        categories[it.category]= [it]
                }
        }
        //console.log(resSpecificRows)
        return categories
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



/**
 * Method that changes the state of favourites from customer and restaurant. 
 * To do so it would create a new row in case there is not one (state : not favourite --> favourite) 
 *      if found then it would delete the row ( state : favourite --> not favourite)
 * @param {*} values contains the email and the id
 * @returns 
 */
async function upsertFavourite(email_restaurant, email_user){

        const rest = await pool.query(format(`SELECT * FROM restaurants WHERE email = %L`,[email_restaurant]))
        const cust = await pool.query(format(`SELECT * FROM customers WHERE email = %L`,[email_user]))
        
        // If restaurant email doesnt match any restaurant
        if (rest.rows.length === 0) return {errMsg : 'Error : provided restaurant email does not match any restaurants!', errCode : 404}

        // If customer email doesnt match any customer
        if (cust.rows.length === 0) return {errMsg : 'Error : provided customer email does not match any customers!', errCode : 404}

        // Get if there is a row aka the customer has chosen the restaurant as favourite
        const queryGet = format('SELECT * FROM favourites WHERE cust_id = %L and rest_id = %L',[email_user], [email_restaurant])
        const fav = await pool.query(queryGet)


        // Not found so it must CREATE it
        if (fav.rows.length === 0) {
                const queryCreate= format('INSERT INTO favourites VALUES(%L, %L) RETURNING *',[email_user], [email_restaurant])
                return pool.query(queryCreate)
                        .then((res)=>{
                                console.log('Inserted');
                                return res.rows
                        })
                        .catch((err)=>{
                                return {errMsg : 'Error has occurred during creating a favourite relation', errCode : 500}
                        })
        }
        // Has been found so it must be deleted
        else {
                const queryDelete= format('DELETE FROM favourites WHERE cust_id = %L and rest_id= %L RETURNING *',[email_user], [email_restaurant])
                return pool.query(queryDelete)
                        .then((res)=>{
                                console.log('Deleted');
                                return res.rows
                        })
                        .catch((err)=>{
                                return {errMsg : 'Error has occurred during deletion of favourite relation', errCode : 500}
                        })
        }
}

module.exports = {getAllRestaurants, getAllRestaurantsByUser, getAllRestaurantsByType, getAllRestaurantsByNameSubstring, getRestaurantByID, updateRestaurant, getFeedback, getAllTypes, getTypes, getMenu, deleteType, insertType, upsertFavourite }

