const restaurants = require('../services/restaurants')

/**
 * Method called to get all the restaurants from the DDBB
 * @param {} req 
 * @param {*} res 
 */
async function getAll(req, res){
    
    const {params} = req

    const rest = await restaurants.getAllRestaurants()
    //console.log(rest)
    if(rest.error)
        return res.status(404).send({"message": "could not retrieve restaurants", "error": rest.error})

    //console.log(rest)

    return res.status(200).send({rest})
}


/**
 * Method called to get all the feedback from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function feedback(req, res){
    const {body} = req 
    const feedback = await restaurants.feedback(body.email) 

    //check for error retreiving from DDBB
    if(!feedback || feedback.length==0) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Feedback not found`})
    if(feedback.error)
        return res.status(404).send({"message": `Feedback not found`, "error": feedback.error})

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
    
    //check for error retreiving from DDBB
    if(!types || types.length==0) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Types not found`})
    if(types.error)
        return res.status(404).send({"message": `Types not found`, "error": types.error})

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

    //check for error retreiving from DDBB
    if(!menu || menu.length==0) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Menu not found`})
    if(menu.error)
        return res.status(404).send({"message": `Menu not found`, "error": menu.error})

    return res.status(200).send({menu})
}

/**
 * Method called to get all the info from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function readR(req, res){
    const {body} = req 
    const restaurant = await restaurants.readR(body.email) 

    //check for error retreiving from DDBB
    if(!restaurant) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Restaurant not found`})
    if(restaurant.error)
        return res.status(404).send({"message": `Restaurant not found`, "error": restaurant.error})

    return res.status(200).send({restaurant})
}

/**
 * Method called to update the avaliability of a restaurant
 * @param {} req
 * @param {*} res 
 */
async function setAv(req, res){

    const {body} = req
    const avaliability = await restaurants.setAv(body) 

    //check for error retreiving from DDBB
    if(!avaliability) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Avaliability not updated`})
    if(avaliability.error)
        return res.status(404).send({"message": `Avaliability not updated`, "error": avaliability.error})

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
    
    //check for error retreiving from DDBB
    if(!visible) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Visible not updated`})
    if(visible.error)
        return res.status(404).send({"message": `Visible not updated`, "error": visible.error})

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
    
    //check for error retreiving from DDBB
    if(!iban) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Iban not updated`})
    if(iban.error)
        return res.status(404).send({"message": `Iban not updated`, "error": iban.error})

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
    
    //check for error retreiving from DDBB
    if(!allergens) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Allergens not updated`})
    if(allergens.error)
        return res.status(404).send({"message": `Allergens not updated`, "error": allergens.error})

    return res.status(200).send({allergens})
}

/**
 * Method called to delete a type of a restaurant, given the pre-existing list, by their id
 * @param {} req
 * @param {*} res 
 */
async function deleteType(req, res){
    const {body} = req
    const delType = await restaurants.deleteType(body) 
    
    //console.log(delType)
    //check for error retreiving from DDBB
    if(!delType) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Type not deleted`})
    if(delType.error)
        return res.status(404).send({"message": `Type not deleted`, "error": delType.error})

    return res.status(200).send({delType})
}

/**
 * Method called to insert a type of a restaurant, given the pre-existing list, by their id
 * @param {} req
 * @param {*} res 
 */
async function insertType(req, res){
    const {body} = req
    const insType = await restaurants.insertType(body) 
    
    //check for error retreiving from DDBB
    if(!insType) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Type not added`})
    if(insType.error)
        return res.status(404).send({"message": `Type not added`, "error": insType.error})

    return res.status(200).send({insType})
}

module.exports = { getAll, feedback, getTypes, menu, readR, setAv, setVisible, setIban, setAllergens, deleteType, insertType }