var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req,res,next){
  let messages = req.session.message || [];
  req.session.message =[];
  res.render('login',{ title: 'Login', messages: messages});
});

router.post('/login', passport.authenticate(
  "local",
  {
    successRedirect: "/projects",
    failureRedirect: "/login",
    failureMessage: "invalid Credentials"
  }
));



router.get('/register', function(req,res,next){
  res.render('register',{ title: 'Register'});
});

router.post("/register", (req, res, next) => {
  // Create a new user based on the information from the page
  // three parameters: new user object, password, callback function
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        // take user back and reload register page
        return res.redirect("/register");
      } else {
        // log user in and redirect
        req.login(newUser, (err) => {
          res.redirect("/projects");
        });
      }
    }
  );
});

module.exports = router;
