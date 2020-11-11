const items_db = require('../services/items.js')

async function get(req, res)
{
    const {body} = req
    //check if the request has the item id
    if(!(body.item_id))
        return res.status(403).send({"message": "Item ID not specified"})
    
    const item = await items_db.getItemByID(body.item_id)
    //check for error retreiving from DDBB
    if(!item)
        return res.status(404).send({"message": `Item ${body.item_id} not found`})

    return res.status(200).send({item})
}

async function create(req, res)
{
    const {body} = req

    const status = await items_db.createItem(body)
    if(status.error)
        return res.status(403).send({"message": "Could not create item", error: status.error})

    return status
}

async function delete(req, res)
{
    const {body} = req
    //check if the request has the item id
    if(!(body.item_id))
        return res.status(403).send({"message": "Item ID not specified"})

    const item = await items_db.deleteItem(body.item_id)
    //check for error retreiving from DDBB
    if(!item)
        return res.status(404).send({"message": `Item ${body.item_id} not found`})

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

    return status
}

module.exports = {get, create, delete, update}
