// Service module to retrieve data from Scheme Users 

const {pool} = require('../database/index.js')

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
function createUser(values){
    const query = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *'
    let db_values = [values.name, values.email, values.password]
    if (!values.name || !values.email || !values.password) return {error : "All field must be filled in order to create the user", errCode : 400}
    return pool.query(query, db_values)
    .then(res =>{
        return res.rows[0] || null
    })
    .catch(err =>  { return {error: `${err}`, errCode : 400}}) 
}

module.exports = {getUsers, getUserByEmail, createUser}
