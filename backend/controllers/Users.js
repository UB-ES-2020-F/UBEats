const users = require('../services/users')
const sch_users = require('../services/users')

/**
 * [JUST FOR DEBUG PURPOSES]
 * Method called to get all the users in the database
 * @param {} req
 * @param {*} res
 */
async function _get_all_users(req, res){
    const {body} = req
    const all_users = await sch_users.getUsers()
    if(!all_users) return res.status(404).send({"message":"no users found"})
    return res.status(200).send({all_users})
}

/**
 * Method called to log in using a email
 * @param {} req 
 * @param {*} res 
 */
async function login(req, res){
    const {body} = req // body request 
    const user = await sch_users.getUserByEmail(body.email)
    //console.log(user)
    if (!user) return res.status(404).send({"message":`User with email:${body.email} not found. Please enter a valid account.`}) 
    if (user) {
        if (!body.password || user.pass != body.password) return res.status(403).send({"message":"Invalid user/password. Please enter a valid account"})
        delete user.pass
        return res.status(200).send({user}) 
    }
}

/**
 * Method called to log in using a email
 * @param {} req 
 * @param {*} res 
 */
async function register(req, res){
    const {body} = req 
    const user = await sch_users.createUser(body) 
    if (user.error) return res.status(user.errCode).send(user.error)
    delete user.pass
    return res.status(200).send({user}) 
}

/**
 * Method called to delete a user (customer, restaurant, deliveryman) using the email
 * @param {} req 
 * @param {*} res 
 */
async function deleteUser(req, res){
    const {params} = req
    //check if the request has the email
    if(!(params.email))
        return res.status(403).send({"message": "e-Mail not specified"})
    
    const user = await sch_users.deleteUser(params.email)
    //console.log(user)
    //check for error retreiving from DDBB
    if(!user)
        return res.status(404).send({"message": `User with e-Mail ${params.email} not found`})

    return res.status(200).send({user})
}

module.exports = { login, register, _get_all_users, deleteUser }
