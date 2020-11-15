const items_db = require('../services/items.js')

/**
 *  Function that requests all available items from the database
 */
async function getAll(req, res)
{
    //console.log("Getting all the items")
    const {params} = req

    const items = await items_db.getAllItems()
    //console.log(items)
    if(items.error)
        return res.status(404).send({"message": "could not retrieve items", "error": items.error})

    //console.log(items)

    return res.status(200).send({items})
}

/**
 * Function that returns an specific item from the database
 */
async function get(req, res)
{
    const {params} = req
    //check if the request has the item id
    if(!(params.item_id))
        return res.status(403).send({"message": "Item ID not specified"})
    
    const item = await items_db.getItemByID(params.item_id)
    //console.log(item)
    //check for error retreiving from DDBB
    if(!item)
        return res.status(404).send({"message": `Item ${params.item_id} not found`})

    return res.status(200).send({item})
}

/**
 * Function that inserts a new item into the database
 * No item_id is necessary because it is created automatically by the ddbb
 */
async function create(req, res)
{
    const {body} = req

    const item = await items_db.createItem(body)
    //console.log(item)
    if(item.error)
        return res.status(403).send({"message": "Could not create item", "error": item.error})

    return res.status(200).send({item})
}

/**
 * Function that removes an item from the database by id
 * The item selection its done by item_id
 */
async function remove(req, res)
{
    const {body} = req
    //check if the request has the item id
    if(!(body.item_id))
        return res.status(403).send({"message": "Item ID not specified"})

    const item = await items_db.deleteItem(body.item_id)
    //check for error retreiving from DDBB
    if(!item) // pg returns NULL but the query executed successfully
        return res.status(404).send({"message": `Item ${body.item_id} not found`})
    if(item.error)
        return res.status(404).send({"message": `Item ${body.item_id} not found`, "error": item.error})

    return res.status(200).send({item})
}

/**
 * Function that modifies the values of an existing item from the database
 * The item selection its done by item_id
 */
async function update(req, res)
{
    const {body} = req
    //check if the request has the item id
    if(!(body.item_id))
        return res.status(403).send({"message": "Item ID not specified"})

    const id = body.item_id

    const item = await items_db.updateItem(body.item_id, body)
    //console.log(item)
    if(!item) // pg returns NULL but the query executed successfully
        return res.status(404).send({"message": `Item ${id} not found`})
    if(item.error)
        return res.status(403).send({"message": "Could not update item", error: item.error})

    return res.status(200).send({item})
}

module.exports = {get, create, remove, update, getAll}
