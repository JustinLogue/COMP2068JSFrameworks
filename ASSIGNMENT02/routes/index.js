var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get('/', function(req, res, next) {
  res.render('index', { title: '4 Corner Work Out', user: req.user });
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

  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);

        return res.redirect("/register");
      } else {

        req.login(newUser, (err) => {
          res.redirect("/rountines");
        });
      }
    }
  );
});

router.get("/logout", function (req, res, next){
  req.logout((error)=> {
    res.redirect("/login");
  })
});

router.get('/github', passport.authenticate("github", {scope: ["user.email"]}));

router.get("/github/callback", passport.authenticate('github',{
      successRedirect: "/projects",
    failureRedirect: "/login",
    failureMessage: "Github Authentication failed"
}

))

module.exports = router;
