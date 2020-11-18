const express = require('express')
//const HelloWorld = require('../controllers/HelloWorld')
const Users = require('../controllers/Users')
const Restaurants = require('../controllers/Restaurants')
const Items = require('../controllers/Items')

const router = express.Router()



// Login / Register
router.post('/login',Users.login)
router.post('/register',Users.register)

//Customer
router.delete('customer/delete',Users.deleteUser)

//Restaurant
router.get('/restaurants',Restaurants.getAll)
router.get('/restaurant/read',Restaurants.readR)
router.get('/restaurant/menu',Restaurants.menu)
router.get('/restaurant/types',Restaurants.getTypes)
router.get('/restaurant/feedback',Restaurants.feedback)
router.post('/restaurant/type',Restaurants.insertType)
router.post('/restaurant/setAvaliability',Restaurants.setAv)
router.post('/restaurant/setVisible',Restaurants.setVisible)
router.post('/restaurant/setIban',Restaurants.setIban)
router.post('/restaurant/setAllergens',Restaurants.setAllergens)
router.delete('/restaurant/type',Restaurants.deleteType)
router.delete('/restaurant',Users.deleteUser)

//Items
router.get('/items', Items.getAll)
router.get('/items/:item_id', Items.get)
router.post('/items', Items.create)
router.delete('/items/:item_id', Items.remove)
router.put('/items/:item_id', Items.update)

//Placeholder for restaurant api
router.get('/restaurant/:rest_id/items', Items.getAllByRestaurant)

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
