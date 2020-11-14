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
    const query = format('SELECT items.item_id,title,items.description,price,name FROM items,type_items,types WHERE items.item_id=type_items.item_id AND rest_id=$1 AND types.type_id=type_items.type_id AND visible = %L ORDER BY items.item_id',[email],1)
    return pool.query(query)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that gets all the info from a restaurant in the DB
 * 
 */
async function readR(email){
    return pool.query('SELECT users.email,name,CIF,street,pass,phone,tipo,avaliability,visible,iban,allergens FROM users,restaurants WHERE users.email=$1 AND users.email=restaurants.email',[email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that updates the avaliability of restaurant
 * Not necessary check if avaliability is empty/null, the sql already does
 * @param {*} values contains the new avaliability and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setAv(values){
    return pool.query('UPDATE restaurants SET avaliability=$1 WHERE email=$2',[values.avaliability],[values.email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that updates the visibility of restaurant
 * Not necessary check if 'visible' is empty/null, the sql already does
 * @param {*} values contains the new visibility and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setVisible(values){
    return pool.query('UPDATE restaurants SET visible=$1 WHERE email=$2',[values.visible],[values.email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that updates the iban of restaurant
 * @param {*} values contains the new iban and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setIban(values){

    //Check that iban length is exactly 24 (standard of spain)
    if (values.iban.length != 24) 
    return {error : "IBAN needs 24 chars exactly, this is the standard of Spain", errCode : 400}

    return pool.query('UPDATE restaurants SET iban=$1 WHERE email=$2',[values.iban],[values.email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Method that updates the allergens of restaurant
 * Not necessary to check if length <=200, the sql already does
 * @param {*} values contains the new link of allergens and the email of the rest. that is going to be updated 
 * @returns 
 */
async function setAllergens(values){

    //Check that iban length is exactly 24 (standard of spain)
    if (!values.allergens || values.allergens.length==0) 
    return {error : "Link of allergens null/empty", errCode : 400}

    return pool.query('UPDATE restaurants SET allergens=$1 WHERE email=$2',[values.allergens],[values.email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err => err) 
}

/**
 * Support method that deletes the types of a restaurant returning * if there is an error
 * This association is made via @argument tipo inside @var values
 * @param {*} values 
 * 
 * 
 */
async function _deleteTypes(email){
    return pool.query('DELETE FROM type_restaurants WHERE rest_id=$1 RETURNING *',[email])
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err =>  { return {error: `${err} specific`, errCode : 400}}) 
}

/**
 * Function from pg-promise to made multiple inserts
 * @param {} template 
 * @param {*} data 
 */
function Inserts(template, data) {
    if (!(this instanceof Inserts)) {
        return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
        return data.map(d=>'(' + pgp.as.format(template, d) + ')').join(',');
    };
}

/**
 * Method that updates the types of restaurant
 * @param {*} values contains the new list of ids of types and the email of the rest. that is going to be updated 
 * @returns 
 */
async function types(body){

    var arrayValues = []
    for (let i of body.types.length){
        arrayValues.push([body.types[i],body.email])
    }

    let deleteT = await _deleteTypes(body.email)
    if (deleteT.error) return {error: `${deleteT.error}`, errCode : deleteT.errCode}

    return pool.query('INSERT INTO type_restaurants VALUES $1',Inserts('$1,$2',arrayValues))
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err =>  {
        pool.query('INSERT INTO type_restaurants VALUES $1',Inserts('$1,$2',deleteT.rows[0]))
        /*Not take the res,err because it's re-insert the types deleted */
        return {error: `${err} specific`, errCode : 400}
    }) 
}

module.exports = {feedback, getTypes, menu, readR, setAv, setVisible, setIban, setAllergens, types }