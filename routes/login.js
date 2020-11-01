var express = require('express');
var router = express.Router();
var loginHandler = require('../handler/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Leave Management System IIT Dhanbad' });
});

router.post('/', function(req, res,next){
  loginHandler.handle(req, res);
});

module.exports = router;
