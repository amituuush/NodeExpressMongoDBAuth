const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // see if a user with a given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }
    // if a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // respond to request indicating the user was created
      res.json({ success: true });
    }); // saves record to database
  });


};
