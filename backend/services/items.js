const format = require('pg-format')
const {pool} = require('../database/index.js')

/**
 * Query for retrieving all the items from the items table
 */
function getAllItems()
{
        return pool.query('SELECT * FROM items')
                .then(res => {
                        return res.rows
                })
                .catch(err => {
                        return {error: err}
                })
}

/**
 * Query to retrieve an specific item from the items table
 * Selection is done by item_id
 */
function getItemByID(id)
{
       return pool.query('SELECT * FROM items WHERE item_id = $1', [id])
                .then(res => {
                        // should ONLY be one match
                        return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err}
                })
}

/**
 * Query to insert a new item.
 * item_id is set to default and the database will take care of incrementing it
 */
function createItem(values)
{
        //check the values
        const check = _checkItemCreationParameters(values)
        //console.log(check)
        if(check.err)
                return {error: check.err, errCode: 403}

        //construct the query
        let db_values = [values.title, values.desc, values.price, values.visible || '0', values.rest_id]

        const query = format('INSERT INTO items VALUES (DEFAULT, %L) RETURNING *', db_values)
        if(query.error)
                return {error: query.error, errCode: 403}

        return pool.query(query)
                .then((res) => {
                       return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 400}
                })
}

/**
 * Query to delete an item from items table selected by item_id
 */
function deleteItem(id)
{
        return pool.query('DELETE FROM items WHERE item_id = $1 RETURNING *', [id])
                .then((res) => {
                        return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Modify the values of an item from the tables items, selected by id
 */
function updateItem(id, values)
{
        const check = _checkItemUpdateParameters(values)
        //console.log(check)
        if(check.err)
                return {error: check.err, errCode: 403}

        const query = _createUpdateDynamicQuery(values)
        if(query.error)
                return {error: query.error, errCode: 403}

        return pool.query(query)
                .then((res) => {
                        return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

/**
 * Auxiliary function to check for the parameters of a body
 * This function is called in the context of item creation
 * Certain parameters are necessary for the creation of an item
 * or have certain constraints and requirements.
 * This functions checks for this constraints and if any of them
 * if violated, an error string is concatenated with previous errors.
 * Finally, an string with all the errors is returned
 */
function _checkItemCreationParameters(params)
{
        var err_str = ''

        if(!(params.title))
                err_str = err_str.concat("No title provided for item\n")
        if(params.title && params.title.length > 30)
                err_str = err_str.concat("Title exceeds the limit of 30 chars\n")

        if(!(params.desc))
                err_str = err_str.concat("No description provided for item\n")
        if(params.desc && params.desc.length > 200)
                err_str = err_str.concat("Description exceeds the limit of 200 chars\n")

        if(!(params.price))
                err_str = err_str.concat("No price provided for item\n")
        if(params.price && params.price < 0)
                err_str = err_str.concat("Item price is a negative number\n")

        if(!(params.rest_id))
                err_str = err_str.concat("No restaurant provided for item\n")
        if(params.rest_id)
        {
                if(params.rest_id > 50)
                        err_str = err_str.concat("Restaurant exceeds the limit of 50 chars\n")
                // check that the restaurant exists
                // also, check that the token_rest == rest_id
        }

        //if errors happenend, return the error string
        if(err_str.length > 0)
                return {err: err_str}

        //if no errors happened, return a boolean indicated all OK
        return {all_good: true}
}

/**
 * Auxiliary function to check for the parameters of a body
 * This function is called in the context of item update
 * The parameters of an item have constraints that must be
 * checked before an update is possible.
 * This functions checks for this constraints and if any of them
 * if violated, an error string is concatenated with previous errors.
 * Finally, an string with all the errors is returned
 * body is expected to have more than 0 key:value pairs
 */
function _checkItemUpdateParameters(params)
{
        var err_str = ''

        if(params.title && params.title.length > 30)
                err_str = err_str.concat("Title exceeds the limit of 30 chars\n")

        if(params.desc && params.desc.length > 200)
                err_str = err_str.concat("Description exceeds the limit of 200 chars\n")

        if(params.price && params.price < 0)
                err_str = err_str.concat("Item price is a negative number\n")

        if(params.rest_id)
        {
                if(params.rest_id > 50)
                        err_str = err_str.concat("Restaurant exceeds the limit of 50 chars\n")
                // check that the restaurant exists
                // also, check that the token_rest == rest_id
        }

        if(err_str.length > 0)
                return {err: err_str}

        return {all_good: true}
}

/**
 * Auxiliary function that builds a dynamic query
 * for SQL with the key:values of an object
 * body is expected to have more than 0 key:value pairs
 */
function _createUpdateDynamicQuery(body)
{
        //console.log(body)
        const {item_id} = body
        delete body.item_id

        var body_size = Object.keys(body).length;
        if(body_size == 0)
                return {"error": "body is empty"}

        var counter = 0;

        var dynamicQuery = 'UPDATE items SET'
        for(const key in body)
        {
                //console.log(key)
                dynamicQuery = dynamicQuery.concat(` "${key}" = `)
                //if value is string, add a '
                if(typeof body[key] == "string")
                        dynamicQuery = dynamicQuery.concat('\'')
                dynamicQuery = dynamicQuery.concat(`${body[key]}`)
                //if value is string, add a '
                if(typeof body[key] == "string")
                        dynamicQuery = dynamicQuery.concat('\'')

                //if keys is not the last, add a comma separator
                if(body_size > 1 && ++counter < body_size)
                        dynamicQuery = dynamicQuery.concat(",")
        }
        dynamicQuery = dynamicQuery.concat(` WHERE item_id = ${item_id} RETURNING *`)

        //console.log(dynamicQuery)

        return dynamicQuery
}

module.exports = {getItemByID, createItem, updateItem, deleteItem, getAllItems}
