const items_db = require('../services/items.js')

async function getAll(req, res)
{
    console.log("Getting all the items")
    const {params} = req

    if(params.restaurant) // GET ALL ITEMS FOR A SPECIFIED RESTAURANT
        {}

    const status = await items_db.getAllItems()
    console.log(status)
    if(status.error)
        return res.status(404).send({"message": "could not retrieve items", "error": status.error})

    return res.status(200).send({status})
}

async function get(req, res)
{
    const {params} = req
    //check if the request has the item id
    if(!(params.item_id))
        return res.status(403).send({"message": "Item ID not specified"})
    
    const item = await items_db.getItemByID(params.item_id)
    //check for error retreiving from DDBB
    if(!item)
        return res.status(404).send({"message": `Item ${params.item_id} not found`})

    return res.status(200).send({item})
}

async function create(req, res)
{
    const {body} = req

    const status = await items_db.createItem(body)
    console.log(status)
    if(status.error)
        return res.status(403).send({"message": "Could not create item", "error": status.error})

    return res.status(200).send({status})
}

async function remove(req, res)
{
    const {body} = req
    //check if the request has the item id
    if(!(body.item_id))
        return res.status(403).send({"message": "Item ID not specified"})

    const item = await items_db.deleteItem(body.item_id)
    //check for error retreiving from DDBB
    if(item.error)
        return res.status(404).send({"message": `Item ${body.item_id} not found`, "error": item.error})

    return res.status(200).send({item})
}

async function update(req, res)
{
    const {body} = req
    //check if the request has the item id
    if(!(body.item_id))
        return res.status(403).send({"message": "Item ID not specified"})

    const status = await items_db.updateItem(body.item_id, body)
    if(status.error)
        return res.status(403).send({"message": "Could not update item", error: status.error})

    return res.status(200).send({status})
}

module.exports = {get, create, remove, update, getAll}
