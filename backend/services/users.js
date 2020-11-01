// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')

const user_type = { customer    : { table : 'customers',    cols : ['email','card']},  
                    deliveryman : { table : 'deliverymans', cols : ['email', 'visibility', 'availiability', 'iban']}, 
                    restaurant  : { table : 'restaurants',  cols : ['email', 'visibility', 'availiability', 'iban']}
                }
/**
     * Customer      -- email || card var(23) 
     * Delivery      -- email || visibility (inactive, invisible, visible) || availiability (rojo, verde)                   || iban
     * Restaurant    -- email || visibility (inactive, invisible, visible) || availiability (rojo, verde, amarillo, naranja)|| iban 
*/

/**
 * Function that retrieves all users from db 
 * @returns an array containg all the users inserted into DB
 */
async function getUsers() {
     //'SELECT * FROM users ORDER BY id ASC' ordering removed
     return pool.query('SELECT * FROM users')
        .then(res =>{
            return res.rows.map(user => user.email)
        })
        .catch(err => err) 
}

/**
 * Function that retrieves information about a user via its email 
 * @returns an array containing the user found. If no user found then it returns null
 */
function getUserByEmail(email) {
    return pool.query('SELECT * FROM users WHERE email = $1',[email])
        .then(res =>{
            return res.rows[0] || null
        })
        .catch(err => err) 
}

/**
 * Method that creates and inserts a user into DB
 * @param {*} values contains all the values needed to create a user 
 * @returns 
 */
async function createUser(values){

    let db_values = [values.email, values.name, values.CIF, values.street, values.password, values.phone, values.type]
    const query = format('INSERT INTO users VALUES (%L) RETURNING *', db_values)

    //Check every key to be present
    if (!values.name || !values.email || !values.password  || !values.CIF || !values.street || !values.phone || !values.type || !Object.keys(user_type).includes(values.type)) 
        return {error : "All field must be filled in order to create the user", errCode : 400}
    
    return pool.query(query)
    .then( async(res)  => {
        let resSpecificrows = await _createSpecficicUser(values)
        if (resSpecificrows.error) return {error: `${resSpecificrows.error}`, errCode : resSpecificrows.errCode}
        res.rows[0].specfics = resSpecificrows
        return res.rows[0] || null
    })
    .catch(err =>  { return {error: `${err}`, errCode : 400}}) 
    
}


/**
 * Support method that creates the specific user type for each user. These types are : customer, deliveryman and restaurant.
 * This association is made via @argument tipo inside @var values
 * @param {*} values 
 * 
 * 
 */
function _createSpecficicUser(values){
    var arrayValues = []
    for (let i of user_type[values.type].cols){
        arrayValues.push(values[i] || '')
    }
    var sql = format('INSERT INTO %I VALUES (%L) RETURNING *', user_type[values.type].table, arrayValues)
    return pool.query(sql)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err =>  { return {error: `${err} specific`, errCode : 400}}) 
    
}

module.exports = {getUsers, getUserByEmail, createUser}
