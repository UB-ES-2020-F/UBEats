const express = require('express')
//const HelloWorld = require('../controllers/HelloWorld')
const Users = require('../controllers/Users')
const Restaurants = require('../controllers/Restaurants')
const Items = require('../controllers/Items')
const Extras = require('../controllers/Extra_items.js')

const router = express.Router()



// Login / Register
router.post('/login',Users.login)
router.post('/register',Users.register)

//Customer
router.delete('customer/delete',Users.deleteUser)

//Restaurants
router.get('/restaurants',Restaurants.getAll)
router.get('/restaurants/:email',Restaurants.get)
router.post('/restaurants',Users.register)
router.delete('/restaurants/:email',Users.deleteUser)
router.put('/restaurants/:email',Restaurants.update)
//Falta ruta put para update de los atributos de la tabla user (Update Users)
router.get('/restaurants/feedback/:email',Restaurants.getFeedback)
router.get('/restaurants/menu/:email',Restaurants.getMenu)
router.get('/restaurants/types/:email',Restaurants.getTypes)
router.post('/restaurants/types',Restaurants.insertType)
router.delete('/restaurants/types/:email/:type_id',Restaurants.deleteType)


//Items
router.get('/items', Items.getAll)
router.get('/items/:item_id', Items.get)
router.post('/items', Items.create)
router.delete('/items/:item_id', Items.remove)
router.put('/items/:item_id', Items.update)

//Extras
router.get('/items/:item_id/extras', Extras.getAllExtrasForItem)
router.get('/items/:item_id/extras/:extra_id', Extras.getExtraForItem)
router.post('/items/:item_id/extras', Extras.createExtraForItem)
router.put('/items/:item_id/extras/:extra_id', Extras.updateExtraForItem)
router.delete('/items/:item_id/extras/:extra_id', Extras.deleteExtraForItem)

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
