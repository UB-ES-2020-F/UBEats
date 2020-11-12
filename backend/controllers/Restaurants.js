const restaurants = require('../services/restaurants')



/**
 * Method called to get all the feedback from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function feedback(req, res){
    const {body} = req 
    const feedback = await restaurants.feedback(body.email) 
    if (feedback.error) res.status(404).send({"message":`Feedback not found for Restaurant with email:${body.email}.`})
    return res.status(200).send({feedback})
}

/**
 * Method called to get all the types from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function getTypes(req, res){
    const {body} = req 
    const types = await restaurants.getTypes(body.email) 
    if (types.error) res.status(404).send({"message":`Types not found for Restaurant with email:${body.email}.`})
    return res.status(200).send({types})
}

/**
 * Method called to get the menu: all the items and their types(repeated columns if they have more than one) from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function menu(req, res){
    const {body} = req 
    const menu = await restaurants.menu(body.email) 
    if (menu.error) res.status(404).send({"message":`Menu not found for Restaurant with email:${body.email}.`})
    return res.status(200).send({menu})
}

/**
 * Method called to get all the info from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function readR(req, res){
    const {body} = req 
    const readR = await restaurants.readR(body.email) 
    if (readR.error) res.status(404).send({"message":`Restaurant not found with email:${body.email}.`})
    return res.status(200).send({readR})
}

module.exports = { feedback, getTypes, menu, readR }


