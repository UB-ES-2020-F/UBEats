const express = require('express')


const router = express.Router()


router.get('/helloworld', (req,res)=>{ return res.status(200).send({'message':'Hello world! -- GET'}) })
router.post('/helloworld', (req,res)=>{ return res.status(200).send({'message':'Hello world! -- POST'}) })
router.put('/helloworld', (req,res)=>{ return res.status(200).send({'message':'Hello world! -- PUT'}) })
router.delete('/helloworld', (req,res)=>{ return res.status(200).send({'message':'Hello world! -- DELETE'}) })


module.exports = router
