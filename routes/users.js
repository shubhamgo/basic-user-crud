var express = require("express");
var router = express.Router();
const User = require("../models/user");

// GET: register form
router.get("/register", (req, res) => {
  res.render("user/register");
});

// NEW. Check if user email exists
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password
  });


  // if user exist dont add them
  User.findOne({email:req.body.email}, (err, existingUser) => {
    if (existingUser === null) {
      console.log ('no user with that email exists')
      // if no user with that email exists, save user
      newUser.save(err => {
        if (err) {
          throw new Error('There was a problem saving data', err);
        } else {
          console.log("success, data saved");
          res.redirect("/users/register");
        }
      });
    } else {
      console.log('use already exists');
      res.json({message: 'use already exists'} );
    }
  });






  // newUser.save(err => {
  //   if (err) {
  //     throw new Error('There was a problem saving data', err);
  //   } else {
  //     console.log("success, data saved");
  //     res.redirect("/users/register");
  //   }
  // });
});





// POST: post request for register form
// router.post("/register", (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     password
//   });

//   newUser.save(err => {
//     if (err) {
//       throw new Error('There was a problem saving data', err);
//     } else {
//       console.log("success, data saved");
//       res.redirect("/users/register");
//     }
//   });
// });

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
  });
});

//******************************************************** 
// START UPDATE
//********************************************************

// UPDATE (part 1): get the user form and prepopulate with values
router.get('/edit/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.render('user/edit', {user});
    }
  });
});

// UPDATE (part 2): on submit, post form to db
router.post("/edit/:id", (req, res) => {
  let user = {};
  const { firstName, lastName, email, password } = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  
  let query = {_id: req.params.id}

  User.update(query, user, (err) => {
    if (err) {
      throw new Error('There was a problem saving data', err);
    } else {
      console.log("success, data updated");
      res.redirect("/users/");
    }
  });
});

module.exports = router;
