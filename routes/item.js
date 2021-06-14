const express = require('express')
const router = express.Router();

const Item = require('../models/Item');

// POST to /Item
router.post('/', async (req, res) => {
    try {
        const { name, imageUrl, price, quantity, description, category } = req.body
        const item = await Item.findOne({ name })
        if(item) {
           const items = await Item.findOneAndUpdate({_id: item._id}, { quantity: item.quantity + quantity }, {new: true})
           return res.status(200).send({ message: 'item updated', items})
        } else {
            const newItem = await new Item({ name, imageUrl, price, quantity, description, category }).save()
            return res.status(201).send({ item: newItem })
        }
    } catch (err) {
        return res.status(403).send({ message: 'Item not added'})
    }
})

// GET to /Item
router.get('/', async(req, res) => {
    try {
        const item = await Item.find({})
        return res.status(200).send({ item })
    } catch (err) {
        return res.status(404).send({message: 'You havent added any item'})
    }
})

// DELETE to /Item
router.delete('/:id', async(req, res) => {
    try {
        await Item.remove( {_id: req.params.id} )
        return res.status(200).send({ Item })
    } catch (err) {
        return res.status(400).send({ message: 'No such item'})
    }
})

module.exports = router