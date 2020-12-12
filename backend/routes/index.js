const express = require('express')
//const HelloWorld = require('../controllers/HelloWorld')
const Users = require('../controllers/Users')
const Restaurants = require('../controllers/Restaurants')
const Items = require('../controllers/Items')
const Extras = require('../controllers/Extra_items.js')
const Orders = require('../controllers/Orders.js')

const router = express.Router()



// Login / Register
router.post('/login',Users.login)
router.post('/register',Users.register)

//Users
router.put('/user/:email', Users.updateUser)

//Customer
router.delete('customer/delete',Users.deleteUser)

//Restaurants
router.get('/restaurants',Restaurants.getAll)
router.get('/restaurants/user/:email',Restaurants.getAllByUser)
router.get('/restaurants/type/:type_id',Restaurants.getAllByType)
router.get('/restaurant/:rest_id/items', Items.getAllByRestaurant)
router.get('/restaurants/:email',Restaurants.get)
router.get('/restaurants/menu/:email',Restaurants.getMenu)

router.get('/restaurants/feedback/:email',Restaurants.getFeedback)
router.get('/restaurants/types/:email',Restaurants.getTypes)
router.get('/types/restaurants',Restaurants.getAllTypes)

router.post('/restaurants',Users.register)

router.post('/restaurants/types',Restaurants.insertType)

router.put('/restaurants/:email',Restaurants.update)

router.delete('/restaurants/types/:email/:type_id',Restaurants.deleteType)
router.delete('/restaurants/:email',Users.deleteUser)

// Favourite
router.post('/restaurants/:email_restaurant/favourite/:email_user', Restaurants.setFavourite)

//Items
router.get('/items', Items.getAll)
router.get('/items/:item_id', Items.get)
router.post('/items', Items.create)
router.put('/items/:item_id', Items.update)
router.delete('/items/:item_id', Items.remove)

//Extras
router.get('/items/:item_id/extras', Extras.getAllExtrasForItem)
router.get('/items/:item_id/extras/:extra_id', Extras.getExtraForItem)
router.post('/items/:item_id/extras', Extras.createExtraForItem)
router.put('/items/:item_id/extras/:extra_id', Extras.updateExtraForItem)
router.delete('/items/:item_id/extras/:extra_id', Extras.deleteExtraForItem)

//Placeholder for restaurant api
router.get('/restaurants/:rest_id/items', Items.getAllByRestaurant)

//Orders
router.get('/orders/:order_id', Orders.get)
router.post('/orders', Orders.create)
router.put('/orders/:order_id', Orders.update)
router.put('/orders/:order_id/items/:item_id', Orders.updateItems)
router.delete('/orders/:order_id', Orders.remove)


module.exports = router
