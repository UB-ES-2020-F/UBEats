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

function _isPositiveOrZeroInteger(n)
{
        if(n == undefined)
                return false;
        
        var x = parseInt(n)
        return !isNaN(n) && x >= 0;
}

function _isPositiveOrZeroFloat(n)
{
        if(n == undefined)
                return false;
        
        var x = parseFloat(n)
        return !isNaN(n) && x >= 0;
}

function _isValidString(str)
{
        if(str == undefined)
                return false;
        
        if(str.indexOf("<") > 0 || str.indexOf(">") > 0 || str.indexOf("|") > 0 || str.indexOf("\\") > 0 || str.indexOf(";") > 0)
                return false;

        var lower = str.toLowerCase()

        if(lower.indexOf("\n") > 0 && lower.indexOf("\t") > 0)
                return false;

        if(str.indexOf("javascript:") > 0)
                return false;
        if(lower.indexOf("javascript:") > 0)
                return false;

        return true;
}

function _isValidEmail(email)
{
        if(email == undefined)
                return false;
        
        if(email.indexOf("@") > 0 || _isValidString(email))
                return true;

        return false;
}

function _isValidURL(url)
{
        if(url == undefined)
                return false;
        
        if(_isValidString(url) || url.indexOf(".") > 0)
                return true;

        return false;
}

function _isValidTelephoneNumberChar(c)
{
        if(c == undefined)
                return false;
        
        if(c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9' || c == '-')
                return true;

        return false;
}

function _isValidTelephoneNumber(num)
{
        if(num == undefined)
                return false;
        
        for(var c of num)
        {
                if(!_isValidTelephoneNumberChar(c))
                        return false;
        }

        return true;
}

module.exports ={ _createUpdateDynamicQuery, _isPositiveOrZeroInteger, _isPositiveOrZeroFloat, _isValidString, _isValidEmail, _isValidURL, _isValidTelephoneNumberChar, _isValidTelephoneNumber}
