const format = require('pg-format')
const {pool} = require('../database/index.js')

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

function createItem(values)
{
        //check the values
        const check = _checkItemCreationParameters(values)
        console.log(check)
        if(check.err)
                return {error: check.err, errCode: 403}

        //construct the query
        let db_values = [values.title, values.desc, values.price, values.visible || '0', values.rest_id]

        const query = format('INSERT INTO items VALUES (DEFAULT, %L) RETURNING *', db_values)

        return pool.query(query)
                .then((res) => {
                       return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 400}
                })
}

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

function updateItem(id, values)
{
        const check = _checkItemUpdateParameters(values)
        if(check.err)
                return {error: check.err, errCode: 403}

        const query = _createUpdateDynamicQuery(values)

        return pool.query(query)
                .then((res) => {
                        return res.rows[0] || null
                })
                .catch(err => {
                        return {error: err, errCode: 500}
                })
}

function _checkItemCreationParameters(params)
{
        var err_str = ''

        if(!(params.title))
                err_str.concat("No title provided for item\n")
        if(params.title && params.title.length > 30)
                err_str.concat("Title exceeds the limit of 30 chars\n")

        if(!(params.desc))
                err_str.concat("No description provided for item\n")
        if(params.desc && params.desc.length > 200)
                err_str.concat("Description exceeds the limit of 200 chars\n")

        if(!(params.price))
                err_str.concat("No price provided for item\n")
        if(params.price && params.price < 0)
                err_str.concat("Item price is a negative number\n")

        if(!(params.rest_id))
                err_str.concat("No restaurant provided for item\n")
        if(params.rest_id)
        {
                if(params.rest_id > 50)
                        err_str.concat("Restaurant exceeds the limit of 50 chars\n")
                // check that the restaurant exists
                // also, check that the token_rest == rest_id
        }

        if(err_str.length > 0)
                return {err: err_str}

        return {all_good: true}
}

function _checkItemUpdateParameters(params)
{
        var err_str = ''

        if(params.title && params.title.length > 30)
                err_str.concat("Title exceeds the limit of 30 chars\n")

        if(params.desc && params.desc.length > 200)
                err_str.concat("Description exceeds the limit of 200 chars\n")

        if(params.price && params.price < 0)
                err_str.concat("Item price is a negative number\n")

        if(params.rest_id)
        {
                if(params.rest_id > 50)
                        err_str.concat("Restaurant exceeds the limit of 50 chars\n")
                // check that the restaurant exists
                // also, check that the token_rest == rest_id
        }

        if(err_str.length > 0)
                return {err: err_str}

        return {all_good: true}
}

function _createUpdateDynamicQuery(body)
{
        //console.log(body)
        const {item_id} = body
        delete body.item_id

        var dynamicQuery = 'UPDATE items SET'
        for(const key in body)
        {
                console.log(key)
                dynamicQuery = dynamicQuery.concat(` ${key} = `)
                if(typeof body[key] == "string")
                        dynamicQuery = dynamicQuery.concat('\'')
                dynamicQuery = dynamicQuery.concat(`${body[key]}`)
                if(typeof body[key] == "string")
                        dynamicQuery = dynamicQuery.concat('\'')
        }
        dynamicQuery = dynamicQuery.concat(` WHERE item_id = ${item_id} RETURNING *`)

        console.log(dynamicQuery)

        return dynamicQuery
}

module.exports = {getItemByID, createItem, updateItem, deleteItem, getAllItems}
