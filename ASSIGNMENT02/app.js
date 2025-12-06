var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var routinesRouter = require("./routes/routines");
var guideRouter = require("./routes/guides");

var hbs =require('hbs');

const mongoose = require('mongoose');
const configs = require('./configs/globals');

var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");

var githubStrategy = require("passport-github2").Strategy;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "ProjectTracker2025",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.use(new githubStrategy(

  {
    clientID: configs.Authentication.GitHub.ClientId,
    clientSecret: configs.Authentication.GitHub.ClientSecret,
    callbackURL: configs.Authentication.GitHub.CallbackURL
  },

  async (accessToken, refreshToken, profile, done) => {

    const user = await User.findOne({ oauthId: profile.id });

    if (user) {

      return done(null, user);
    }
    else {

      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });

      const savedUser = await newUser.save();

      return done(null, savedUser);
    }
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(()=> {
    console.log("Connected to MongoDB... :)")
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err)
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/routines', routinesRouter);
app.use('/guides', guideRouter);

hbs.registerHelper("toShortDate", (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
})

hbs.registerHelper("createOptionElement", (currentValue, selectedValue)=> {
  if(currentValue === selectedValue){
    return new hbs.SafeString("<option selected>" + currentValue + "</option>");
  }
  else{
    return new hbs.SafeString("<option>" + currentValue + "</option>");
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
