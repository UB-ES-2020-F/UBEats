const restaurants = require('../services/restaurants')



/**
 * Method called to get all the feedback from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function feedback(req, res){
    const {body} = req 
    const feedback = await restaurants.feedback(body.email) 
    if (feedback.error) res.status(404).send({"message":`Feedback not found.`})
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
    if (types.error) res.status(404).send({"message":`Types not found.`})
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
    if (menu.error) res.status(404).send({"message":`Menu not found.`})
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
    if (readR.error) res.status(404).send({"message":`Restaurant not found.`})
    return res.status(200).send({readR})
}

/**
 * Method called to update the avaliability of a restaurant
 * @param {} req
 * @param {*} res 
 */
async function setAv(req, res){
    const {body} = req 
    const avaliability = await restaurants.setAv(body) 
    if (avaliability.error) res.status(404).send({"message":`Avaliability not updated.`})
    return res.status(200).send({avaliability})
}

/**
 * Method called to update the 'visible' of a restaurant
 * @param {} req
 * @param {*} res 
 */
async function setVisible(req, res){
    const {body} = req 
    const visible = await restaurants.setVisible(body) 
    if (visible.error) res.status(404).send({"message":`Visible not updated.`})
    return res.status(200).send({visible})
}

/**
 * Method called to update the 'iban' of a restaurant
 * @param {} req
 * @param {*} res 
 */
async function setIban(req, res){
    const {body} = req 
    const iban = await restaurants.setIban(body) 
    if (iban.error) res.status(404).send({"message":`iban not updated.`})
    return res.status(200).send({iban})
}

/**
 * Method called to update the 'allergens' of a restaurant
 * @param {} req
 * @param {*} res 
 */
async function setAllergens(req, res){
    const {body} = req 
    const allergens = await restaurants.setAllergens(body) 
    if (allergens.error) res.status(404).send({"message":`allergens not updated.`})
    return res.status(200).send({allergens})
}

/**
 * Method called to update the types of a restaurant, given the pre-existing list, by their id
 * @param {} req
 * @param {*} res 
 */
async function types(req, res){
    const {body} = req //body.email, body.types an array of ids
    const types = await restaurants.types(body) 
    if (types.error) res.status(404).send({"message":`types not updated.`})
    return res.status(200).send({types})
}

module.exports = { feedback, getTypes, menu, readR, setAv, setVisible, setIban, setAllergens, types }