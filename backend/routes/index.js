const express = require('express')
const HelloWorld = require('../controllers/HelloWorld')

const router = express.Router()


router.get('/helloworld', HelloWorld.getHelloWorld)
router.post('/helloworld', HelloWorld.postHelloWorld)
router.put('/helloworld', HelloWorld.putHelloWorld)
router.delete('/helloworld', HelloWorld.deleteHelloWorld)


module.exports = router
