// Service module to retrieve data from Scheme Users 
const format = require('pg-format')
const {pool} = require('../database/index.js')
const {_createUpdateDynamicQuery} = require('../helpers/helpers')

const user_type = { 
                    user        : { table : 'users',    cols : ['email','name','CIF','street','phone','tipo','url']},  
                    customer    : { table : 'customers',    cols : ['email','card'], defaultValues : {'email' : '', 'card': ''}},  
                    deliveryman : { table : 'deliverymans', cols : ['email',  'availiability', 'visible', 'iban'], defaultValues : {'email' : '', 'visible': 'inactive', 'availiability' : 'rojo','iban': ''}}, 
                    restaurant  : { table : 'restaurants',  cols : ['email',  'availiability', 'visible', 'iban'], defaultValues : {'email' : '', 'visible': 'inactive', 'availiability' : 'rojo','iban': ''}}
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
        .catch(err => {
            return {error: err, errCode: 500}
    }) 
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
        .catch(err => {
            return {error: err, errCode: 500}
    })
}

/**
 * Method that creates and inserts a user into DB
 * @param {*} values contains all the values needed to create a user 
 * @returns 
 */
async function createUser(values){

    let db_values = [values.email, values.name, values.CIF || '', values.street || '', values.password, values.phone || '', values.type]

    const query = format('INSERT INTO users VALUES (%L) RETURNING *', db_values)
    //console.log(values);
    //Check every key to be present
    if (!values.name || !values.email || !values.password   || !values.type || !Object.keys(user_type).includes(values.type)) 
        return {error : "All field must be filled in order to create the user", errCode : 400};
    
    return pool.query(query)
        .then( async(res)  => {
            let resSpecificrows = await _createSpecficicUser(values)
            //If an error has occurred during userspecific creating it deletes the user 
            //and returns the error
            if (resSpecificrows.error) {
                var sqlUsers = format("DELETE FROM users WHERE email=%L",res.rows[0].email)
                var deletedUsers = await pool.query(sqlUsers)
                return {error: `${resSpecificrows.error}`, errCode : resSpecificrows.errCode}
            }       
            res.rows[0].specifics = resSpecificrows

            return res.rows[0] || null
        })
        .catch(err => {
            return {error: err, errCode: 500}
        })
    
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
        arrayValues.push(values[i] || user_type[values.type].defaultValues[i])    
    }
    var sql = format('INSERT INTO %I VALUES (%L) RETURNING *', user_type[values.type].table, arrayValues)
    return pool.query(sql)
        .then(res =>{
            return res.rows[0] || null
        })
        .catch(err => {
            return {error: err, errCode: 500}
        }) 
}

/**
 * Method that deletes a user from the DB
 * 
 */
async function deleteUser(email){
    return pool.query('DELETE FROM users WHERE email = $1 RETURNING *',[email])
        .then((res) => {
            return res.rows[0] || null
        })
        .catch(err => {
            return {error: err, errCode: 500}
        })
}


/**
 * Method that updates a user from Database
 * @param email the email of the user. User with that email must exist on db
 * @param values corresponds to the new user information. It has the email and type too.
 */
async function updateUser(email, values){
    


    const preUser = await getUserByEmail(email)
    if (!preUser)
        return {error : `User with email ${email} not found`, errCode : 404}

    // We divide the values into 2 objects : User and specificUser ( restaurant, customer, deliveryman)
    const userType = user_type[values.type]

    let spcificUser = {}
    let user = {}

    user.email = email
    spcificUser.email = email

    //user object
    for (let i of user_type.user.cols){
        if (values[i]){
            user[i] = values[i]
            delete values[i]
        }
    }

    // specificUser object
    for (let i of userType.cols){
        if (values[i]){
            spcificUser[i] = values[i]
            delete values[i]
        }
    }

    delete user.type
    delete values.type
    
    if (Object.entries(values).length != 0) return {error: `Some fields does not match any column.`, errCode : 400}
    const query = _createUpdateDynamicQuery(user, 'users', 'email')// Table users changed via email
    const resUser = !query.error ? await pool.query(query) : null
    if (resUser && resUser.error) {
        return {error: `${resUser.error}`, errCode : resUser.errCode}
    }

    const querySp = _createUpdateDynamicQuery(spcificUser,`${userType.table}`, 'email')// Table specificUser (restaurant, customer, delivery) changed via email
    const resSpecific = !querySp.error ? await pool.query(querySp) : null
    if (resSpecific && resSpecific.error){
        const qPre = _createUpdateDynamicQuery(preUser, 'users','email')
        const resPrevUser = await pool.query(qPre)
        return {error: `${resSpecific.error}`, errCode : resSpecific.errCode}
    }
    
    let res = {}


    if (resUser) res = {...res,...resUser.rows[0]}
    if (resSpecific) res.specifics = {...resSpecific.rows[0]}

    return res
}

module.exports = {getUsers, getUserByEmail, createUser, deleteUser, updateUser}
