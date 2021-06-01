var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://immense-eyrie-42860.herokuapp.com/auth/google/callback"
      },
      async(accessToken, refreshToken, profile, done) => {
           const newUser = {
               googleId: profile.id,
               displayName: profile.displayName,
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               image: profile.photos[0].value
           }

           try {
               let user = await User.findOne({ googleId: profile.id})
                  if(user) {
                      done(null, user)
                  } else {
                      user = await User.create(newUser);
                  }
           } catch(err) {
              console.log(err);
           }
      }))

      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      });

      passport.use(new FacebookStrategy({
       clientID: process.env.FACEBOOK_APP_ID,
       clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://immense-eyrie-42860.herokuapp.com/auth/facebook/callback"
      },
      async(accessToken, refreshToken, profile, done) => {
           console.log(profile);
            const newUser = {
              provider: profile.provider,
              facebookId: profile.id,
              email: (profile.emails && profile.emails[0]) ? profile.emails[0].value : ''
              firstName: first_name,
              lastName: last_name,
          };
          console.log(newUser);

           try {
               let user = await User.findOne({ facebookId: id})
                  if(user) {
                      done(null, user)
                  } else {
                      user = await User.create(newUser);
                  }
           } catch(err) {
              console.log(err);
           }
      }))

      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      });
}