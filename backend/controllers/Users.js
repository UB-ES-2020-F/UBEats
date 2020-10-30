const users = require('../services/users')
const sch_users = require('../services/users')


/**
 * Method called to log in using a email
 * @param {} req 
 * @param {*} res 
 */
async function login(req, res){
    const {body} = req // body request 
    const user = await sch_users.getUserByEmail(body.email) 
    
    if (!user) return res.status(404).send({"message":`User with email:${body.email} not found. Please enter a valid account.`}) 
    if (user) {
        console.log(user);
        if (!body.password || user.password != body.password) return res.status(403).send({"message":"Invalid user/password. Please enter a valid account"})
        delete user.password
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
    console.log(user);
    if (user.error) return res.status(users.errCode).send(user.error)
    delete user.password
    return res.status(200).send({user}) 
}

module.exports = { login, register }