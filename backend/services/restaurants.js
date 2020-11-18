// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')


/**
 * Method that gets the feedback of a restaurant from the DB
 * 
 */
async function feedback(email){

    //Check every key to be present
    if (!email) 
        return {error : "email must be filled", errCode : 400}

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
    
    //Check every key to be present
    if (!email) 
        return {error : "email must be filled", errCode : 400}

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
async function menu(email){
    
    //Check every key to be present
    if (!email) 
        return {error : "email must be filled", errCode : 400}

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
 * Method that gets all the info from a restaurant in the DB
 * 
 */
async function readR(email){
    
    //Check every key to be present
    if (!email) 
        return {error : "email must be filled", errCode : 400}

    return pool.query('SELECT users.email,name,"CIF",street,pass,phone,tipo,url,avaliability,visible,iban,allergens FROM users,restaurants WHERE users.email=$1 AND users.email=restaurants.email',[email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that updates the avaliability of restaurant
 * Not necessary check if avaliability is empty/null, the sql already does
 * @param {*} values contains the new avaliability and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setAv(values){
    
    //Check every key to be present
    if (!values.email || !values.avaliability) 
        return {error : "email and avaliability must be filled", errCode : 400}

    const query = format('UPDATE restaurants SET avaliability=%L WHERE email=%L RETURNING *',[values.avaliability],[values.email])
    return pool.query(query)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that updates the visibility of restaurant
 * Not necessary check if 'visible' is empty/null, the sql already does
 * @param {*} values contains the new visibility and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setVisible(values){
    
    //Check every key to be present
    if (!values.email || !values.visible) 
        return {error : "email and 'visible' must be filled", errCode : 400}

    const query = format('UPDATE restaurants SET visible=%L WHERE email=%L RETURNING *',[values.visible],[values.email])
    return pool.query(query)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that updates the iban of restaurant
 * @param {*} values contains the new iban and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setIban(values){
    
    //Check every key to be present
    if (!values.iban || !values.email) 
        return {error : "email and iban must be filled", errCode : 400}

    //Check that iban length is exactly 24 (standard of spain)
    if (values.iban.length != 24) 
        return {error : "IBAN needs 24 chars exactly, this is the standard of Spain", errCode : 400}

    const query = format('UPDATE restaurants SET iban=%L WHERE email=%L RETURNING *',[values.iban],[values.email])
    return pool.query(query)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that updates the allergens of restaurant
 * Not necessary to check if length <=200, the sql already does
 * @param {*} values contains the new link of allergens and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setAllergens(values){

    //Check every key to be present
    if (!values.allergens || !values.email || values.allergens.length==0) 
        return {error : "email and 'allergens link' must be filled", errCode : 400}

    const query = format('UPDATE restaurants SET allergens=%L WHERE email=%L RETURNING *',[values.allergens],[values.email])
    return pool.query(query)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Method that deletes a type of the restaurant by the type_id and email
 * @param {*} values contains the email and the id
 * @returns 
 */
async function deleteType(values){

    //Check every key to be present
    if (!values.type_id || !values.email) 
        return {error : "email and type_id must be filled", errCode : 400}

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

    //Check every key to be present
    if (!values.type_id || !values.email) 
        return {error : "email and type_id must be filled", errCode : 400}

    const query = format('INSERT INTO type_restaurants VALUES (%L,%L) RETURNING *',[values.type_id],[values.email])
    return pool.query(query)
        .then(res =>{
            return res.rows[0] || null
        })
        .catch(err => { return {error: `${err} specific`, errCode : 400}}) 
}

module.exports = {feedback, getTypes, menu, readR, setAv, setVisible, setIban, setAllergens, deleteType, insertType }
