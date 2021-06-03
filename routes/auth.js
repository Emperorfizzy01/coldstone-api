const express = require('express')
const passport = require('passport')
const router = express.Router();
const jwt = require('jsonwebtoken');

// @desc    Auth with google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope : ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', 
   passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      // Successful authentication, redirect home.
      const payload = { user: req.user };
      const options = { expiresIn: '2d' };
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, options);
      return res.status(200).send({ token })
      // return res.status(200).send({ token })
      // res.redirect('/');
});


module.exports = router