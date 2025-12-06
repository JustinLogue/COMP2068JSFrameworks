var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('guide', { title: '4 Corner Work Out', user: req.user });
});

module.exports = router;