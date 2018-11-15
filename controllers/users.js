//users.js
const User = require('../models/User');
const bcrypt = require ('bcrypt');


module.exports = {
  signInGet: function (req, res, next) {
    res.render('user/signin', { message: '' });
  },
  signInPost: function (req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));
    let user = req.body;
    //query db with username, and return password value
    User.findOne({name: user.name}, 'password', function(err, foundUser) {
      //synchronous validation
      if (foundUser) {
        let validated = bcrypt.compareSync(user.password, foundUser.password)
        //boolean for condition
        if (validated) {
          console.log('matches');
          res.render('index', { title: 'Welcome, ' + user })
        } else if (!validated) {
          console.log('bad pass');
          res.render('user/signin', {message: 'wrong username or pass'});
          //console.log(typeof res.render('user/signin', {message: 'wrong username or pass'}));
        }
      } else if (!foundUser) {
        console.log('bad username');
        res.render('user/signin', {message: 'wrong username or pass'})
      } else {
        console.log(err);
      }
    } )
  },
  signUpGet: function (req, res, next) {
    res.render('user/signup', { message: ""});
  },
  signUpPost: function(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));
    let user = req.body;
    if (user.name === "" || user.password === "" || user.email === "") {
        res.render('user/signup', {message: 'fields cannot be left blank'});
    }
    //console.log(req.body.name);
    //checks to see if username is already taken
    User.findOne({name: user.name}, 'name', function(err, foundUser) {
      if (foundUser) {
        //if user exists with that username
        res.send('user already exists with that username' + ' ' + foundUser.name);
      } else if (!foundUser) {
        //create user because no match
        user = new User(user);
        console.log(user.id);
        let salt = bcrypt.genSaltSync(10);
        let pass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = pass;
        user.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            res.render('user/signin', {message: 'Successfully Registered'})
            console.log(user);
          }
        })
      } else {
        //error handler
        console.log('error' + err);
      }
    });
  }
};
