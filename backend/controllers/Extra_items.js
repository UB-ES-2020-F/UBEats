const items_db = require('../services/items.js')
const extras_db = require('../services/extra_items.js')

/**
 * Function to get all the extra items for a specified item
 */
async function getAllExtrasForItem(req, res)
{
    const item_id = req.params.item_id

    const item_exists = await items_db.existsItemID(item_id)
    if(item_exists.error || !(item_exists.exists))
        return res.status(404).send({message: `Item ${item_id} does not exist`})

    const extras = await extras_db.getAllExtrasForItem(item_id)
    //console.log(extras)
    if(!extras)
        return res.status(404).send({"message": `Extra items for ${item_id} not found`})
    if(extras.error)
        return res.status(extras.errCode).send({"message": "could not retrieve extra items", "error": extras.error})

    return res.status(200).send({extras})
}

/**
 * Function to get one specific extra item for a specified item
 */
async function getExtraForItem(req, res)
{
    const item_id = req.params.item_id
    const extra_id = req.params.extra_id

    const item_exists = await items_db.existsItemID(item_id)
    //console.log(item_exists)
    if(item_exists.error || !(item_exists.exists))
        return res.status(404).send({message: `Item ${item_id} does not exist`})

    const extra = await extras_db.getExtraForItem(item_id, extra_id)
    //console.log(extra)
    if(!extra)
        return res.status(404).send({"message": `Extra items for ${item_id} not found`})
    if(extra.error)
        return res.status(extra.errCode).send({"message": "could not retrieve extra items", "error": extra.error})

    return res.status(200).send({extra})

}

/**
 * Function to create a new extra item for a specified item
 */
async function createExtraForItem(req, res)
{
    const item_id = req.params.item_id
    const {body} = req

    const item_exists = await items_db.existsItemID(item_id)
    //console.log(item_exists)
    if(item_exists.error || !(item_exists.exists))
        return res.status(404).send({message: `Extra item ${item_id} does not exist`})


    const extra = await extras_db.createExtraForItem(item_id, body)
    //console.log(extra)
    if(extra.error)
        return res.status(extra.errCode).send({message: "Could not create extra item", error: extra.error})

    return res.status(200).send({extra})
}

/**
 * Function to update an existing extra item for a specified item
 */
async function updateExtraForItem(req, res)
{
    const item_id = req.params.item_id
    const extra_id = req.params.extra_id
    const {body} = req

    const item_exists = await items_db.existsItemID(item_id)
    //console.log(item_exists)
    if(item_exists.error || !(item_exists.exists))
        return res.status(404).send({message: `Extra item ${item_id} does not exist`})

    const extra = await extras_db.updateExtraForItem(item_id, extra_id, body)
    //console.log(extra)
    if(!extra)
        return res.status(404).send({message: "Could not update extra item because it does not exists"})
    if(extra.error)
        return res.status(extra.errCode).send({message: "Could not update extra item", error: extra.error})

    return res.status(200).send({extra})
}

/**
 * Function to delete an existing extra item for a specified item
 */
async function deleteExtraForItem(req, res)
{
    const item_id = req.params.item_id
    const extra_id = req.params.extra_id

    const item_exists = await items_db.existsItemID(item_id)
    //console.log(item_exists)
    if(item_exists.error || !(item_exists.exists))
        return res.status(404).send({message: `Extra item ${item_id} does not exist`})

    const extra = await extras_db.deleteExtraForItem(item_id, extra_id)
    //console.log(extra)
    if(!extra)
        return res.status(404).send({message: "Could not update extra item because it does not exists"})
    if(extra.error)
        return res.status(extra.errCode).send({message: "Could not update extra item", error: extra.error})

    return res.status(200).send({extra})
}

module.exports = {getAllExtrasForItem, getExtraForItem, createExtraForItem, updateExtraForItem, deleteExtraForItem}
