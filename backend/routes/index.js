const express = require('express')
//const HelloWorld = require('../controllers/HelloWorld')
const Users = require('../controllers/Users')
const Restaurants = require('../controllers/Restaurants')

const router = express.Router()


/**
 * LOGIN  
 */

router.post('/login',Users.login)
router.post('/register',Users.register)

//Customer
router.post('/customer/login',Users.login)
router.post('/customer/register',Users.register)
router.delete('customer/delete',Users.deleteUser)

//Restaurant
router.post('/restaurant/login',Users.login)
router.post('/restaurant/register',Users.register)
router.delete('/restaurant/delete',Users.deleteUser)
router.get('/restaurant/feedback',Restaurants.feedback)
router.get('/restaurant/type',Restaurants.getTypes)
router.get('/restaurant/menu',Restaurants.menu)
router.get('/restaurant/read',Restaurants.readR)
router.patch('restaurant/setAvaliability',Restaurants.setAv)
router.patch('restaurant/setVisible',Restaurants.setVisible)
router.patch('restaurant/setIban',Restaurants.setIban)
router.patch('restaurant/setAllergens',Restaurants.setAllergens)
router.post('restaurant/types',Restaurants.types)

//Deliveryman
router.delete('/deliveryman/delete',Users.deleteUser)

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
