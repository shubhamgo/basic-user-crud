const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * GET: register form
 */
router.get('/register', (req, res) => {
  res.render('user/register');
});


/**
 * POST: register a new user
 * Check if user email exists, if it does don't add them
 * if user email not in db save them
 */
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  // if user email exist dont add them
  User.findOne({ email }, (err, existingUser) => {
    if (existingUser === null) {
      // if no user with that email exists, save user
      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Data saved to mongo');
          res.redirect('/users/register');
        }
      });
    } else {
      res.send('<h1>Sorry, that email already exists</h1>');
      // res.json({ message: 'Sorry, that email already exists' });
    }
  });
});


/**
 * GET: get all users
 */
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user/users', { users });
    }
  }).sort({ _id: -1 });
});


/**
 * GET: get single user details
 */
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user/details', { user });
    }
  });
});


/**
 * UPDATE: updated user
 * (Part 1) GET: the user form and prepopulate with values 
 * (part 2): POST: on form submit, post form to db
 */

// GET: the user form and prepopulate with values 
router.get('/edit/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user/edit', { user });
    }
  });
});

// POST/UPDATE: on form submit, post form to db
router.post('/edit/:id', (req, res) => {
  const user = {};
  const { firstName, lastName, email, password } = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;

  const query = { _id: req.params.id };

  User.update(query, user, (err) => {
    if (err) {
      throw new Error('There was a problem saving data', err);
    } else {
      console.log('success, data updated');
      res.redirect('/users/');
    }
  });
});


/**
 * DELETE: Article by id (done with jquery, is this really neccessary)
 * used so that confirm button can be used to confirm action
 */
router.delete('/:id', (req, res) => {
  const query = { _id: req.params.id };

  User.findById(req.params.id, (err) => {
    User.remove(query, (err) => {
      if (err) {
        console.log(err);
      }
      res.send('Success');
    });
  });
});


module.exports = router;
