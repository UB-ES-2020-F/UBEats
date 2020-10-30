const express = require('express')
const HelloWorld = require('../controllers/HelloWorld')
const Users = require('../controllers/Users')

const router = express.Router()


/**
 * LOGIN  
 */
//Customer

//Restaurant
router.post('/restaurant/login',Users.login)
router.post('/restaurant/register',Users.register)



/**
 * These example will be deleted after Sprint 1. 
 * HelloWorld test routes
 */
router.get('/helloworld', HelloWorld.getHelloWorld)
router.post('/helloworld', HelloWorld.postHelloWorld)
router.put('/helloworld', HelloWorld.putHelloWorld)
router.delete('/helloworld', HelloWorld.deleteHelloWorld)


module.exports = router
