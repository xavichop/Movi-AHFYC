var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('managing_nicknames/index.jade',{ title : 'X Chat' });
});
router.get('/login', function(req, res, next) {
  res.render('login/login.jade',{ title : 'X Chat' });
});

module.exports = router;
