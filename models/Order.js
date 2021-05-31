const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [ItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Order', OrderSchema)