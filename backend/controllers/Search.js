const search_db = require('../services/restaurants.js')

/**
 * Function to retrieve a list of restaurants
 * whom names match by substring with the
 * query performed
 *
 * If nothing is found, an empty list is returned,
 * event when an error ocurred
 */
async function SearchRestaurantByNameSubstring(req, res)
{
    const {params} = req
    if(!(params.rest_substr))
        return res.status(200).send([])

    //get list of rests by substring
    const rests = await search_db.getAllRestaurantsByNameSubstring(params.rest_substr)
    //console.log(rests)
    if(!rests)
        return res.status(200).send([])
    if(rests.error)
        return res.status(200).send([])

    return res.status(200).send({rests})
}

module.exports = {SearchRestaurantByNameSubstring}
