const express = require('express')
const router = express.Router();
const { validateToken } = require('../middleware/auth')

const User = require('../models/User')


// POST to /cart/user
router.post('/user', validateToken, async (req, res) => {
   try {
       const { items } = req.body
       if(req.decoded) {
           const user = await User.findById(req.decoded.id)
           if(user) {
               await User.findOneAndUpdate({ _id: req.decoded.id}, { $set: { modified_on: new Date(), cart: [...items]} }, 
            //    $push: {cart: [...items]}, 
            )
               return res.status(200).send({ user })
           }
       }
   } catch (err) {
       console.log(err);
       return res.status(400).send({ message: "Nothing to push"})
   }
})

// GET to cart/user
router.get('/user', validateToken, async(req, res) => {
    try {
        if(req.decoded) {
            const user = await User.findById(req.decoded.id)
            if(user) {
                const cartList = user.cart
                return res.status(200).send({ cartList }) 
            }
        }
    } catch (err) {
        return res.status(400).send({ message: "Cart is empty"})
    }
})


// try {
//     const { items } = req.body
//     if(req.decoded) {
//         const user = await User.findById(req.decoded.user._id)
//         if(user) {
//            await User.findOneAndUpdate({ _id: req.decoded.user._id}, { "$push":{cart: [...items] }}, (err, user) => {
//            return res.status(200).send({ user })
//        }
// } catch (err) {
//     return res.status(400).send({ message: "Nothing to push"})
// }
// const carts = user.cart.filter(item => Boolean(item)).map(item => item.name)
// const cartItems = items.map(item => item.name)
// const foundItem = carts.some(cart => cartItems.includes(cart))
// if(foundItem == true) {
//     await User.findOneAndUpdate({ _id: req.decoded.user._id}, )
//     return res.status(200).send({ message: 'Data already exist'})
//  } else {
//     await User.findOneAndUpdate({ _id: req.decoded.user._id }, { "$push":{cart: [...items] }}, (err, user) => {
//     return res.status(200).send({ user })
// })
//     } 

module.exports = router