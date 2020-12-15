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
                                importe : 0.0,
                                items : []
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
        //check the values to verify there is no possible error: the parameters exists(restID, delivID, custID, items) and are in the ddbb, there is no quantity=0, the items are from the restaurant...
        const check = _checkOrderCreationParameters(values)
        //console.log(check)
        if(check.err)
                return {error: check.err, errCode: 400}

        //Check the restaurant, deliveryman and customer exists in DDBB
        const rest_exists = await existsRestaurant(values.rest_id)
        if(rest_exists.error || !(rest_exists.exists))
                return {error: `Restaurant ${values.rest_id} does not exist in DDBB`, errCode: 404}
        const deliv_exists = await existsDeliveryman(values.deliv_id)
        if(deliv_exists.error || !(deliv_exists.exists))
                return {error: `Deliveryman ${values.deliv_id} does not exist in DDBB`, errCode: 404}
        const cust_exists = await existsCustomer(values.cust_id)
        if(cust_exists.error || !(cust_exists.exists))
                return {error: `Customer ${values.cust_id} does not exist in DDBB`, errCode: 404}

        //Check the items belong to restaurant(it also checks implicitly that the items exist because they are in the restaurant)
        const itemsCheck = await checkRestaurantsItems(values.rest_id, values.items)
        if(itemsCheck.err)
                return {error: itemsCheck.err, errCode: 404}

        //construct the query
        let db_values = [values.rest_id, values.deliv_id, values.cust_id]
        //One only query to post the order because we checked previously all possible errors
        var query = format("WITH ins1 AS (INSERT INTO orders VALUES (DEFAULT, %L,'esperando',CURRENT_TIMESTAMP(0)) RETURNING order_id)", db_values)
        query = query.concat("INSERT INTO order_items VALUES ")
        //values.items = [{item_id : item_id1,cantidad : cantidad1},{item_id : item_id2,cantidad : cantidad2}...]
        values.items.forEach(item => {
                query = query.concat(`((SELECT order_id FROM ins1),${item.item_id},${item.cantidad}),`)
        })
        query = query.substring(0,query.length -1)
        query = query.concat(" RETURNING *")
        //console.log(query)
        return pool.query(query)
                .then((res) => {
                        //At least one row
                        //console.log(res.rows)
                        return res.rows          
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
                        return res.rows[0]
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Modify the values of an order from the tables orders, order_items, selected by id
 */
async function updateOrder(values)
{
        //Body must have order_id, and status or items, check that items or status are valid
        const check = _checkOrderUpdateParameters(values)
        if(check.err)
                //console.log(check.err)
                return {error: check.err, errCode: 400}
        
        //Cannot use the _CreateUpdateDynamicQuery because body has items from order_items, and order_items' primary key has two keys
        
        //Case 1: If !values.status and !values.items: nothing to update, error
        if(!values.status && !values.items)
                return {error: "Nothing to update", errCode: 400}

        var query, itemsCheck
        const order_original = await pool.query(`SELECT * FROM orders WHERE order_id=${values.order_id}`)
        if(!order_original.rows[0])
                return {error: "Order not found", errCode: 404}

        //Case 2: only update status
        if(values.status && !values.items){
                query = `UPDATE orders SET status='${values.status}' WHERE order_id=${values.order_id} RETURNING *`
                //console.log(query)
                return pool.query(query)
                        .then((res) => {
                                //Only one row
                                return res.rows[0]
                        })
                        .catch(err => {
                                //Never going to happen
                                return {error: err, errCode: 500}
                        })
        }

        var itemsPrev
        //Case 3: only update items
        if(!values.status && values.items){
                itemsCheck = await checkRestaurantsItems(order_original.rows[0].rest_id, values.items)
                if(itemsCheck.err)
                        return {error: itemsCheck.err, errCode: 404}

                //itemsPrev always must be !=null, at least one row
                itemsPrev = await pool.query(`DELETE FROM order_items WHERE order_id=${values.order_id} RETURNING *`)

                query = "INSERT INTO order_items VALUES "
                //values.items = [{item_id : item_id1,cantidad : cantidad1},{item_id : item_id2,cantidad : cantidad2}...]
                values.items.forEach(item => {
                        query = query.concat(`(${values.order_id},${item.item_id},${item.cantidad}),`)
                })
                query = query.substring(0,query.length -1)
                query = query.concat(" RETURNING *")
                //console.log(query)
                return pool.query(query)
                        .then((res) => {
                                //At least one row
                                return res.rows
                        })
                        .catch(err => {
                                //Never going to happen
                                return {error: err, errCode: 500}
                        })
        }

        //Case 4: update status and items
        if(values.status && values.items){
                itemsCheck = await checkRestaurantsItems(order_original.rows[0].rest_id, values.items)
                if(itemsCheck.err)
                        return {error: itemsCheck.err, errCode: 404}

                //itemsPrev always must be !=null, at least one row
                itemsPrev = await pool.query(`DELETE FROM order_items WHERE order_id=${values.order_id} RETURNING *`)

                query = `WITH ins1 AS (UPDATE orders SET status='${values.status}' WHERE order_id=${values.order_id} RETURNING order_id) `
                query = query.concat("INSERT INTO order_items VALUES ")
                //values.items = [{item_id : item_id1,cantidad : cantidad1},{item_id : item_id2,cantidad : cantidad2}...]
                values.items.forEach(item => {
                        query = query.concat(`((SELECT order_id FROM ins1),${item.item_id},${item.cantidad}),`)
                })
                query = query.substring(0,query.length -1)
                query = query.concat(" RETURNING *")
                return pool.query(query)
                        .then((res) => {
                                //At least one row
                                return res.rows
                        })
                        .catch(err => {
                                //Never going to happen
                                return {error: err, errCode: 500}
                        })
        }   
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
                if(!item.item_id || !item.cantidad)
                        err_str = err_str.concat("Item has not item_id or cantidad\n")
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
        var err_str = ''

        //Check there is no more keys
        for(const key in params){
                //console.log(key=='status')
                //console.log(key=='order_id')
                if(key=='status' || key=='order_id' || key=='items')
                        continue
                else
                        err_str = err_str.concat("Status, order_id, and items are not the only keys\n")
        }

        //Check that the param status is valid if it is in body
        if(params.status && (['esperando','preparando','preparado','enviado','entregado'].indexOf(params.status)==-1))
                err_str = err_str.concat("Status is not valid\n")

        //Check that if exists the list of items to update, it is not empty, and quantity !=0 for every item
        if(params.items){
                if(params.items.length == 0)
                        err_str = err_str.concat("Items list empty\n")
                else
                        params.items.forEach(item =>{
                                if(!item.item_id || !item.cantidad)
                                        err_str = err_str.concat("Item has not item_id or cantidad\n")
                                if (item.cantidad == 0)
                                        err_str = err_str.concat("At least one item quantity is null\n")
                        })
        }
                

        //if errors happenend, return the error string
        if(err_str.length > 0)
                return {err: err_str}

        //if no errors happened, return a boolean indicated all OK
        return {all_good: true}
}

/**
 * Function to check for the existance of a restaurant by its email
 */
async function existsRestaurant(email)
{
        return pool.query('SELECT COUNT(*) FROM restaurants WHERE email = $1', [email])
                .then((res) => {
                        if(res.rows[0].count > 0)
                                return {exists: true}
                        else
                                return {exists: false}
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Function to check for the existance of a deliveryman by its email
 */
async function existsDeliveryman(email)
{
        return pool.query('SELECT COUNT(*) FROM deliverymans WHERE email = $1', [email])
                .then((res) => {
                        if(res.rows[0].count > 0)
                                return {exists: true}
                        else
                                return {exists: false}
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Function to check for the existance of a customer by its email
 */
async function existsCustomer(email)
{
        return pool.query('SELECT COUNT(*) FROM customers WHERE email = $1', [email])
                .then((res) => {
                        if(res.rows[0].count > 0)
                                return {exists: true}
                        else
                                return {exists: false}
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Function to check for the existance of the items and they belong to the restaurant in the DDBB
 */
async function checkRestaurantsItems(rest_id, items){
        const itemsInRest = await pool.query('SELECT item_id FROM items WHERE rest_id=$1',[rest_id])
        var listItems = itemsInRest.rows.map(row=>row.item_id)
        //console.log(listItems)
        var err_str = ''
        items.forEach(item=>{
                //console.log(parseInt(item.item_id,10))
                //console.log(listItems)
                if(listItems.indexOf(parseInt(item.item_id,10))==-1)
                        err_str = err_str.concat('Item not in restaurant\n')
        })

        //if errors happenend, return the error string
        if(err_str.length > 0)
                return {err: 'Almost one item is not in DDBB/restaurant'}

        //if no errors happened, return a boolean indicated all OK
        return {all_good: true}
}



module.exports = {getOrder, createOrder, updateOrder, deleteOrder}
