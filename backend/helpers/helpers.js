/**
 * Auxiliary function that builds a dynamic query
 * for SQL with the key:values of an object
 * body is expected to have more than 0 key:value pairs.
 * 
 * @param table table to be updated
 * @param where would be the conditional to be checked in SQL script ( WHERE item_id ). WHERE value has to be deleted from body too
 */
function _createUpdateDynamicQuery(body, table, where)
{
        //console.log(body)
        const whereItem = body[where] // Gets the item
        delete body[where] // Deletes from the body the item used as where.

        var body_size = Object.keys(body).length;
        if(body_size == 0)
                return {"error": "body is empty"}

        var counter = 0;

        var dynamicQuery = `UPDATE ${table} SET`
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
        dynamicQuery = dynamicQuery.concat(` WHERE ${where} = '${whereItem}' RETURNING *`)

        return dynamicQuery
}

module.exports ={ _createUpdateDynamicQuery}