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
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    facebookId: {
        type: String
    },
    emailAddress: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    displayName: {
        type: String,
    },
    image: {
        type: String,
    },
    cart: [ItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)