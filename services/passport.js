const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// create local strategy
const localOptions = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify email and password, call done() with the user if it is the correct email and password
  // otherwise, call done() with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { console.log(err); }
    if (!user) { return done(null, false);}

    // compare passwords -- is password equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { console.log(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    })
  });
});


// set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JWT Strategy, function is called whenever user tries to log in or we need to authenticate a user with a jwt
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if userID in the payload exists in our database
  // if it does, call 'done()' with that user
  // otherwise, call done() without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }

  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
