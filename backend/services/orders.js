const format = require('pg-format')
const {pool} = require('../database/index.js')
const {_createUpdateDynamicQuery} = require('../helpers/helpers')

/**
 * Query to retrieve an specific order from the order,order_items table
 * Selection is done by order_id
 */
async function getOrder(id)
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
async function createOrder(values)
{
        //check the values
        const check = _checkOrderCreationParameters(values)
        //console.log(check)

        if(check.err)
                return {error: check.err, errCode: 403}

        //construct the query
        let db_values = [values.rest_id, values.deliv_id, values.cust_id]
        
        var query = format("WITH ins1 AS (INSERT INTO orders VALUES (DEFAULT, %L,'esperando',CURRENT_TIMESTAMP(0)) RETURNING order_id)", db_values)
        query = query.concat("INSERT INTO order_items VALUES ")
        //values.items = [{item_id : item_id1,cantidad : cantidad1},{item_id : item_id2,cantidad : cantidad2}...]
        values.items.forEach(item => {
                query = query.concat(`((SELECT order_id FROM ins1),${item.item_id},${item.cantidad}),`)
        })
        query = query.substring(0,query.length -1)
        query = query.concat(" RETURNING *")
        //console.log(query)
        if(query.error)
                return {error: query.error, errCode: 403}
        return pool.query(query)
                .then((res) => {
                        //At least one row
                        //console.log(res.rows)
                        return res.rows || null            
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Query to delete an order from orders,order_items table selected by order_id
 */
async function deleteOrder(id)
{
        return pool.query('DELETE FROM orders WHERE order_id=$1 RETURNING *', [id])
                .then(res => {
                        //Should be only one row
                        return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Modify the values of an order from the tables orders, order_items, selected by id
 */
async function updateOrder(id, values)
{
        
}

/**
 * Modify the values of an order_items from the tables orders, order_items, selected by pkey(order_id, item_id)
 */
async function updateOrderItems(id, values)
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
        var err_str = ''

        if(!(params.rest_id))
                err_str = err_str.concat("No restaurant id provided for order\n")
        
        if(!(params.deliv_id))
                err_str = err_str.concat("No deliveryman id provided for order\n")

        if(!(params.cust_id))
                err_str = err_str.concat("No customer id provided for order\n")

        if(!(params.items))
                err_str = err_str.concat("No items list provided for order\n")
        if(params.items && params.items.length == 0)
                err_str = err_str.concat("Items list empty\n")

        params.items.forEach(item =>{
                if (item.cantidad == 0)
                        err_str = err_str.concat("At least one item quantity is null\n")
        })
        
        //if errors happenend, return the error string
        if(err_str.length > 0)
                return {err: err_str}

        //if no errors happened, return a boolean indicated all OK
        return {all_good: true}
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



module.exports = {getOrder, createOrder, updateOrder, updateOrderItems, deleteOrder}
