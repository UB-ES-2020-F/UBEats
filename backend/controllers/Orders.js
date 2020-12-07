const orders_db = require('../services/orders.js')

/**
 *  Function that requests an order by the order_id from the database
 */
async function get(req, res)
{
    const {params} = req
    //check if the request has the order id
    if(!(params.order_id))
        return res.status(403).send({"message": "Order ID not specified"})
    
    const order = await orders_db.getOrder(params.order_id)
    //console.log(order)
    //check for error retreiving from DDBB
    if(!order)
        return res.status(404).send({"message": `Order ${params.order_id} not found`})

    return res.status(200).send({order})
}

/**
 *  Function that creates an order from the buying chart to database
 */
async function create(req, res)
{
    
}

/**
 *  Function that updates an order by the order_id from the database
 */
async function update(req, res)
{
    
}

/**
 *  Function that removes an order by the order_id from the database
 */
async function remove(req, res)
{
    
}


module.exports = {get, create, update, remove}
