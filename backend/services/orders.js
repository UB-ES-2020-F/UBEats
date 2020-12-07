const format = require('pg-format')
const {pool} = require('../database/index.js')
const {_createUpdateDynamicQuery} = require('../helpers/helpers')

/**
 * Query to retrieve an specific order from the order,order_items table
 * Selection is done by order_id
 */
function getOrder(id)
{
       return pool.query('SELECT * FROM orders,order_items,items WHERE orders.order_id=order_items.order_id AND order_items.item_id=items.item_id AND orders.order_id=$1', [id])
                .then(res => {
                        //HAY QUE PROCESAR EL RETURN: order_id,rest_id,deliv_id,cust_id,status,timestamp,[item_id,cantidad,title,desc,price,visible,url,cat_id]
                        //check at least one row
                        if(!res.rows[0]) return null

                        var order = {
                                order_id : res.rows[0].order_id,
                                rest_id : res.rows[0].rest_id,
                                deliv_id : res.rows[0].deliv_id,
                                cust_id : res.rows[0].cust_id,
                                status : res.rows[0].status,
                                timestamp : res.rows[0].timestamp,
                                items : [],
                                importe : 0.0
                        }
                        res.rows.forEach(row => {
                                order.importe = order.importe + row.price*row.cantidad
                                order.items.push(
                                {
                                        item_id : row.item_id,
                                        cantidad : row.cantidad,
                                        title : row.title,
                                        desc : row.desc,
                                        price : row.price
                                })
                        })

                        return order
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Query to insert a new order.
 * order_id is set to default and the database will take care of incrementing it
 */
function createOrder(values)
{
       //CHECK QUE LOS ITEMS PERTENEZCAN AL RESTAURANTE, DELIVERYMAN POR DEFECTO
}

/**
 * Query to delete an order from orders,order_items table selected by order_id
 */
function deleteOrder(id)
{
        
}

/**
 * Modify the values of an order from the tables orders, order_items, selected by id
 */
function updateOrder(id, values)
{
        
}


/**
 * Auxiliary function to check for the parameters of a body
 * This function is called in the context of order creation
 * Certain parameters are necessary for the creation of an order
 * or have certain constraints and requirements.
 * This functions checks for this constraints and if any of them
 * if violated, an error string is concatenated with previous errors.
 * Finally, an string with all the errors is returned
 */
function _checkOrderCreationParameters(params)
{
        
}

/**
 * Auxiliary function to check for the parameters of a body
 * This function is called in the context of order update
 * The parameters of an order have constraints that must be
 * checked before an update is possible.
 * This functions checks for this constraints and if any of them
 * if violated, an error string is concatenated with previous errors.
 * Finally, an string with all the errors is returned
 * body is expected to have more than 0 key:value pairs
 */
function _checkOrderUpdateParameters(params)
{
        
}



module.exports = {getOrder, createOrder, updateOrder, deleteOrder}
