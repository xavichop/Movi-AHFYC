var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('login/userlist.jade',{ title : 'X Chat' });
  res.render('managing_nicknames/userlist.jade',{ title : 'X Chat' });
});
router.get('/loginR', function(req, res, next) {
  res.render('login/login.jade',{ title : 'X Chat' });
});
router.get('/mongotest', function(req, res, next) {
  res.render('login/userlist.jade',{ title : 'X Chat' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

module.exports = router;
