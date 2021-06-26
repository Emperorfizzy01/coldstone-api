const express = require('express')
const router = express.Router();
const { validateToken } = require('../middleware/auth')

const Order = require('../models/Order');

// POST /order/items
router.post('/items', validateToken, async(req, res) => {
    const { items, totalPrice} = req.body
   try {
        if(req.decoded) {
        const order = await new Order({ cart: items, totalPrice, userId: req.decoded.user._id }).save()
        return res.status(201).send({ message: 'Order successful', order })
    }
   } catch (err) {
       return res.status(403).send({ message: 'Unable to process request'})
   }
})

// GET /order/items
router.get('/items', validateToken, async(req,res) => {
    try {
        if(req.decoded) {
          const order = await Order.find({ userId: req.decoded.user._id})
          return res.status(200).send({order})
        }
    } catch (err) {
        return res.status(404).send({ message: "You haven't made any order "})
    }
})
//    const user = await Order.find({user: req.decoded.user._id})
        //    console.log(user);
        //    if(user) {
        //        const orderedItems = await Order.create({ "$push":{order: [...items]}, totalPrice })
        //        return res.status(201).send({ orderedItems })
        //    }

module.exports = router