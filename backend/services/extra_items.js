const format = require('pg-format')
const {pool} = require('../database/index.js')

/**
 * Function that performs a query to the ddbb to get all extra items for a specific item_id
 */
function getAllExtrasForItem(item_id)
{
        return pool.query('SELECT * FROM extra_items WHERE item_id = $1 AND EXISTS (SELECT * FROM items WHERE item_id = $1)', [item_id])
                .then(res => {
                        return res.rows
                })
                .catch(err => {
                        return {error: err}
                })
}

/**
 * Function that performs a query to the ddbb to get one specific item for a specific item_id
 */
function getExtraForItem(item_id, extra_id)
{
        return pool.query('SELECT * FROM extra_items WHERE item_id = $1 AND extraitem_id = $2', [item_id, extra_id])
                .then(res => {
                        return res.rows[0]
                })
                .catch(err => {
                        return {error: err}
                })
}

/**
 * Function that performs a insertion on the ddbb for a specific item_id with the values on body
 */
function createExtraForItem(item_id, body)
{
        const check = _checkCreateBody(item_id, body)
        //console.log(check)
        if(check.error)
                return {error: check.error, errCode: 403}

        const query = format('INSERT INTO extra_items VALUES(DEFAULT, %L) RETURNING *', Object.values(body))
        return pool.query(query)
                .then((res) => {
                        return res.rows[0]
                })
                .catch(err => {
                        return {error: err, errCode: 400}
                })
}

/**
 * Function that performs an update of an existing extra item for a specific item_id an extraitem_id
 * The values are passed on the body
 */
function updateExtraForItem(item_id, extra_id, body)
{
        const check = _checkUpdateBody(item_id, body)
        //console.log(check)
        if(check.error)
                return {error: check.error, errCode: 403}

        const query = _createUpdateDynamicQuery(item_id, extra_id, body)
        if(query.error)
                return {error: query.error, errCode: 500}

        return pool.query(query)
                .then((res) => {
                        return res.rows[0]
                })
                .catch(err => {
                        return {error: err, errCode: 400}
                })
}

/**
 * Function that deletes an extra item from the ddbb by extraitem_id
 */
function deleteExtraForItem(item_id, extra_id)
{
        return pool.query('DELETE FROM extra_items WHERE extraitem_id = $1', [extra_id, item_id])
                .then((res) => {
                        return res.rows[0]
                })
                .catch(err => {
                        return {error: err, errCode: 400}
                })
}

/**
 * Auxiliary function that performs validity checks on the body of an HTTP POST request
 */
function _checkCreateBody(item_id, body)
{
        var err_str = ''

        if(!(body.name))
                err_str = err_str.concat("No name provided for extra item\n")

        if(!(body.desc))
                err_str = err_str.concat("No description provided for extra item\n")

        if(!(body.price))
                err_str = err_str.concat("No price provided for extra item\n")
        if(body.price && body.price < 0)
                err_str = err_str.concat("Extra item is a negative number\n")

        if(!(body.mandatory))
                body.mandatory = '0'
        if(body.mandatory > 1 || body.mandatory < 0)
                err_str = err_str.concat("Mandatory must be a boolean value {'0'|'1'}\n")

        if(!(body.item_id))
                err_str = err_str.concat("No item id provided for extra item\n")
        if(body.item_id && body.item_id < 0)
                err_str = err_str.concat("Item ID is a negative number\n")
        if(body.item_id != item_id)
                err_str = err_str.concat("Item ID in URL does not match item ID in body\n")

        if(err_str.length > 0)
                return {error: err_str}

        return {all_good: true}
}

/**
 * Auxiliary function that performs validity checks on the body of an HTTP PUT request
 */
function _checkUpdateBody(item_id, body)
{
        var err_str = ''

        if(body.price && body.price < 0)
                err_str = err_str.concat("Extra item is a negative number\n")

        if(body.mandatory && (body.mandatory > 1 || body.mandatory < 0))
                err_str = err_str.concat("Mandatory must be a boolean value {'0'|'1'}\n")

        if(body.item_id && body.item_id < 0)
                err_str = err_str.concat("Item ID is a negative number\n")
        if(body.item_id && (body.item_id != item_id))
                err_str = err_str.concat("Item ID in URL does not match item ID in body\n")

        if(err_str.length > 0)
                return {error: err_str}

        return {all_good: true}
}

/**
 * Auxiliary function that builds a dynamic query
 * for SQL with the key:values of an object
 * body is expected to have more than 0 key:value pairs
 */
function _createUpdateDynamicQuery(item_id, extra_id, body)
{
        if(body.extraitem_id)
                delete body.extraitem_id

        var body_size = Object.keys(body).length;
        if(body_size == 0)
                return {"error": "body is empty"}

        var counter = 0;

        var dynamicQuery = 'UPDATE extra_items SET'
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
        dynamicQuery = dynamicQuery.concat(` WHERE extraitem_id = ${extra_id} AND item_id = ${item_id} RETURNING *`)

        //console.log(dynamicQuery)

        return dynamicQuery
}

module.exports = {getAllExtrasForItem, getExtraForItem, createExtraForItem, updateExtraForItem, deleteExtraForItem}
