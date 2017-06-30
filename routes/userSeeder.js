const User = require("../models/user");
const mongoose = require('mongoose');
const config = require('../config/database');

// connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
const db = mongoose.connection;
// Check for connection and db errors
db.once('open', () => {
  console.log('Successfully connected to Mongodb!');
});

const users = [
  new User({
    firstName: 'joel',
    lastName: 'longie',
    email: 'joel@gmail.com',
    password: 'password'
  }),
 
];


// insert each document into db, then disconnect
let done = 0;
users.forEach((user, i) => {
  user.save((err, result) => {
    done++;
    if (done === user.length) {
      exit();
    } else {
      console.log(`document ${i + 1} saved to db.`);
    }
  });
});

const exit = () => {
  mongoose.disconnect();
  console.log('Successfully disconnected from mongo!');
};
