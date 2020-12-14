const orders_db = require('../services/orders.js')

/**
 *  Function that requests an order by the order_id from the database
 */
async function get(req, res)
{
    const {params} = req
    //check if the request has the order id
    if(!(params.order_id))
        return res.status(400).send({"message": "Order ID not specified"})
    
    const order = await orders_db.getOrder(params.order_id)
    //console.log(order)
    //check for error retreiving from DDBB
    if(!order)
        return res.status(404).send({"message": `Order ${params.order_id} not found`})
    if(order.error)
        return res.status(order.errCode).send({"message": order.error})

    return res.status(200).send({order})
}

/**
 *  Function that creates an order from the buying chart to database
 */
async function create(req, res)
{
    const {body} = req
    //console.log(body)
    const order = await orders_db.createOrder(body)
    //console.log(order)
    if(order.error)
        return res.status(order.errCode).send({"message": "Could not create order", "error": order.error})

    return res.status(200).send({order})
}

/**
 *  Function that updates an order by the order_id from the database
 */
async function update(req, res)
{
    const {params} = req
    const {body} = req
    //check if the request has the order_id
    if(!(params.order_id))
        return res.status(400).send({"message": "Order ID not specified"})

    const order_id = params.order_id
    // the services orders.js functions works with the assumption
    // that the body contains the order_id
    body.order_id = order_id
    
    const order = await orders_db.updateOrder(body)
    //console.log(order)
    if(!order) // pg returns NULL but the query executed successfully
        return res.status(404).send({"message": `order ${order_id} not found`})
    if(order.error)
        return res.status(order.errCode).send({"message": "Could not update order", error: order.error})
    
    return res.status(200).send({order})
}

/**
 *  Function that updates items of an order by the order_id and item_id from the database
 */
async function updateItems(req, res)
{
    const {params} = req
    const {body} = req
    //check if the request has the order_id
    if(!(params.order_id) || !(params.item_id))
        return res.status(400).send({"message": "Order ID / Item ID not specified"})

    const order_id = params.order_id
    const item_id = params.item_id
    // the services orders.js functions works with the assumption
    // that the body contains the order_id and item_id
    body.order_id = order_id
    body.item_id = item_id
    
    const orderItems = await orders_db.updateOrderItems(body)
    //console.log(orderItems)
    if(!orderItems) // pg returns NULL but the query executed successfully
        return res.status(404).send({"message": `orderItems (${order_id},${item_id}) not found`})
    if(orderItems.error)
        return res.status(orderItems.errCode).send({"message": "Could not update orderItems", error: orderItems.error})
    
    return res.status(200).send({orderItems})
}

/**
 *  Function that removes an order by the order_id from the database
 */
async function remove(req, res)
{
    const {params} = req
    //check if the request has the order id
    if(!(params.order_id))
        return res.status(400).send({"message": "Order ID not specified"})
    
    const order = await orders_db.deleteOrder(params.order_id)
    //console.log(order)
    //check for error retreiving from DDBB
    if(!order)
        return res.status(404).send({"message": `Order ${params.order_id} not found`})
    if(order.error)
        return res.status(order.errCode).send({"message": "Could not remove order", error: order.error})

    return res.status(200).send({order})
}


module.exports = {get, create, update, updateItems, remove}
