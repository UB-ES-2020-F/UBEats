const dotenv = require('dotenv')
dotenv.config() // Configure dotenv at the beginning of the project

const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const routes = require('./routes/index')

const PORT = process.env.PORT || 3000 

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.use(express.static('../frontend/build/'))
app.use('/api', routes)

app.listen(PORT, function (){
    console.log(`App running in port ${PORT}`);
})
