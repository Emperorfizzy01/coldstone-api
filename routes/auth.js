const express = require('express')
const passport = require('passport')
const router = express.Router();

// @desc    Auth with google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope : ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', 
   passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      // Successful authentication, redirect home.
      return res.status(200).send({ token })
      res.redirect('/');
});

router.get('/facebook',  passport.authenticate('facebook', { scope: ['profile' ]}));

// @desc    Google auth callback
// @route   GET /auth/facebook/callback
router.get('/facebook/callback', 
   passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
      // Successful authentication, redirect home.
      return res.status(200).send({ message: "Success"})
      res.redirect('/');
});





module.exports = router