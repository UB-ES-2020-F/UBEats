const Pool = require('pg').Pool
const pool = new Pool({
    user : process.env.DB_USER || 'hector',
    host : process.env.DB_HOST || 'localhost',
    database : process.env.DB_DATABASE || 'ubereats',
    password : process.env.DB_PWD || '',
    port: process.env.DB_PORT || 5432
})


module.exports = {pool}