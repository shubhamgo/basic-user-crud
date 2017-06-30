var express = require("express");
var router = express.Router();
const User = require("../models/user");

// GET: register form
router.get("/register", (req, res) => {
  res.render("user/register");
});

// POST: post request for register form
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password
  });

  newUser.save(err => {
    if (err) {
      throw new Error('There was a problem saving data', err);
    } else {
      console.log("success, data saved");
      res.redirect("/users/register");
    }
  });
});

// GET: get all users
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err)
    } else {
      res.render('user/users', {users});
    }
  }).sort({_id:-1});
});

// GET: single user
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.render('user/details', {user});
    }

  })
});

module.exports = router;
