const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

// POST to /index/user
router.post('/user/signup', async (req, res) => {
    try {
        const saltRounds = 10;
        const { emailAddress, firstName, lastName, password } = req.body
        const user = await User.findOne({ emailAddress })
        if(user) {
           return res.status(400).send({ message: 'A user with that email already exist'})
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                const newUser = await new User({ emailAddress, firstName, lastName, password: hash }).save()
                return res.status(201).send({ user: newUser })
            });  
        }
    } catch (err) {
        return res.status(401).send( {message: 'Missing required fields'} )
    }
})

// GET to /index/user/login
router.post('/user/login', async (req, res) => {
    try {
        const { emailAddress, password } = req.body
        const user = await User.findOne({ emailAddress })
        // Load hash from the db, which was preivously stored 
        bcrypt.compare(password, user.password, function(err, passwordMatched) {
            if(passwordMatched){
                // Create a token
                const payload = { id: user._id, emailAddress: user.emailAddress };
                const options = { expiresIn: '2d' };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);
                console.log(token);
                return res.status(200).send({ token })
            } else {
                return res.status(500).send({ message: 'Password Incorrect'})
            }
    });   
    } catch (err) {
        return res.status(401).send( {message: 'Login credentials incorrect'} )
    }
});


module.exports = router
