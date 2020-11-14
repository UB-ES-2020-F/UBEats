const dotenv = require('dotenv')
dotenv.config() // Configure dotenv at the beginning of the project

const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const express = require('express')
const routes = require('./routes/index')

const PORT = process.env.PORT || 3000 

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// First use the api routes because the regular expression
// for the frontend will match all the api calls
app.use('/api', routes)
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(PORT, function (){
    console.log(`App running in port ${PORT}`);
})



module.exports = app; // for testing
