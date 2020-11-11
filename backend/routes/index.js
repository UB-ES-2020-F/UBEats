const express = require('express')
//const HelloWorld = require('../controllers/HelloWorld')
const Users = require('../controllers/Users')

const router = express.Router()


/**
 * LOGIN  
 */

router.post('/login',Users.login)
router.post('/register',Users.register)

//Customer
router.post('/customer/login',Users.login)
router.post('/customer/register',Users.register)

//Restaurant
router.post('/restaurant/login',Users.login)
router.post('/restaurant/register',Users.register)

//Items
router.get('/item', Items.get)
router.post('/item', Items.create)
router.delete('/item', Items.delete)
router.put('/item', Items.update)

//Debug
router.get('/qwertyuiop/users',Users._get_all_users)


/**
 * These example will be deleted after Sprint 1. 
 * HelloWorld test routes
 */
//router.get('/helloworld', HelloWorld.getHelloWorld)
//router.post('/helloworld', HelloWorld.postHelloWorld)
//router.put('/helloworld', HelloWorld.putHelloWorld)
//router.delete('/helloworld', HelloWorld.deleteHelloWorld)


module.exports = router
