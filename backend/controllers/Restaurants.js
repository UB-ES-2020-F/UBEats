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
        return res.status(404).send({"message": "Could not retrieve restaurants", "error": rest.error})

    //console.log(rest)

    return res.status(200).send({rest})
}

/**
 * Method called to get all the restaurants from the DDBB using a userId
 * @param {} req  params : email of a user
 * @param {*} res 
 */
async function getAllByUser(req, res){
    
    const {email} = req.params
    if (!email)
        return res.status(403).send({message : "e-mail not specified"})
    const rest = await restaurants.getAllRestaurantsByUser(email)

    if(rest.error)
        return res.status(404).send({"message": "Could not retrieve restaurants", "error": rest.error})

    //console.log(rest)

    return res.status(200).send({rest})
}

/**
 * Method called to get all the restaurants from the DDBB using a userId
 * @param {} req params : type_id 
 * @param {*} res 
 */
async function getAllByType(req, res){
    
    const {type_id} = req.params
    if (!type_id)
        return res.status(403).send({message : "Type not specified"})
    const rest = await restaurants.getAllRestaurantsByType(type_id)

    if(rest.error)
        return res.status(404).send({"message": "Could not retrieve restaurants", "error": rest.error})

    //console.log(rest)

    return res.status(200).send({rest})
}

/**
 * Method called to get all the info from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function get(req, res){
    const {params} = req
    //check if the request has the email
    if(!(params.email))
        return res.status(403).send({"message": "e-mail not specified"})
    
    const restaurant = await restaurants.getRestaurantByID(params.email)
    //console.log(restaurant)
    //check for error retreiving from DDBB
    if(!restaurant)
        return res.status(404).send({"message": `Restaurant with e-mail ${params.email} not found`})

    return res.status(200).send({restaurant})
}

/**
 * Function that modifies the values of an existing restaurant from the database
 * The restaurant selection its done by email
 */
async function update(req, res)
{
    const {params} = req
    const {body} = req
    //check if the request has the email
    if(!(params.email))
        return res.status(403).send({"message": "Restaurant ID (e-mail) not specified"})

    const email = params.email
    // the services restaurants.js functions works with the assumption
    // that the body contains the email
    body.email = email

    const restaurant = await restaurants.updateRestaurant(email, body)
    //console.log(restaurant)
    if(!restaurant) // pg returns NULL but the query executed successfully
        return res.status(404).send({"message": `Restaurant ${email} not found`})
    if(restaurant.error)
        return res.status(403).send({"message": "Could not update restaurant", error: restaurant.error})
    
    return res.status(200).send({restaurant})
}


/**
 * Method called to get all the feedback from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function getFeedback(req, res){
    const {params} = req
    //check if the request has the email
    if(!(params.email))
        return res.status(403).send({"message": "e-mail not specified"})

    const feedback = await restaurants.getFeedback(params.email) 

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
    const {params} = req
    //check if the request has the email
    if(!(params.email))
        return res.status(403).send({"message": "e-mail not specified"})
 
    const types = await restaurants.getTypes(params.email) 
    
    //check for error retreiving from DDBB
    if(!types || types.length==0) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Types not found`})
    if(types.error)
        return res.status(404).send({"message": `Types not found`, "error": types.error})

    return res.status(200).send({types})
}

/**
 * Method called to get all the types associated with the restaurants
 * @param {} req 
 * @param {*} res 
 */
async function getAllTypes(req, res){
    const types = await restaurants.getAllTypes() 
    
    //check for error retreiving from DDBB
    if(types.error)
        return res.status(types.error).send({"message": types.error})

    return res.status(200).send(types)
}

/**

 * Method called to get the menu: all the items and their types(repeated columns if they have more than one) from a restaurant
 * @param {} req 
 * @param {*} res 
 */
async function getMenu(req, res){
    const {params} = req
    //check if the request has the email
    if(!(params.email))
        return res.status(403).send({"message": "e-mail not specified"})

    const menu = await restaurants.getMenu(params.email) 

    //check for error retreiving from DDBB
    if(!menu || menu.length==0) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Menu not found`})
    if(menu.error)
        return res.status(404).send({"message": `Menu not found`, "error": menu.error})

    return res.status(200).send({menu})
}

/**
 * Method called to delete a type of a restaurant, given the pre-existing list, by their id
 * @param {} req
 * @param {*} res 
 */
async function deleteType(req, res){
    const {params} = req

    //Check every key to be present
    if (!params.type_id || !params.email) 
        return {error : "email and type_id must be filled", errCode : 400}

    const delType = await restaurants.deleteType(params) 
    
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

    //Check every key to be present
    if (!body.type_id || !body.email) 
        return {error : "email and type_id must be filled", errCode : 400}

    const insType = await restaurants.insertType(body) 
    
    //check for error retreiving from DDBB
    if(!insType) // pg returns NULL/empty but the query executed successfully
        return res.status(404).send({"message": `Type not added`})
    if(insType.error)
        return res.status(404).send({"message": `Type not added`, "error": insType.error})

    return res.status(200).send({insType})
}




/**
 * Function that modifies the values of an existing restaurant from the database
 * The restaurant selection its done by email
 */
async function setFavourite(req, res)
{
    const {email_restaurant, email_user} = req.params
    
    //check if the request has the both emails : customer and restaurant
    if(!email_restaurant)
        return res.status(403).send({"message": "Restaurant e-mail not specified"})

    if(!email_user)
        return res.status(403).send({"message": "Customer e-mail not specified"})

    const restaurant = await restaurants.upsertFavourite(email_restaurant, email_user)

    // In case any error has occurred 
    if(restaurant && restaurant.errMsg)
        return res.status(restaurant.errCode).send({errMsg : restaurant.errMsg})
    
    return res.status(200).send({favourite : restaurant})
}

module.exports = { getAll, getAllByUser, getAllByType, get, update, getFeedback, getAllTypes, getTypes, getMenu, deleteType, insertType,setFavourite  }

