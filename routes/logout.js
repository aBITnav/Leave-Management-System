var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.email){
        delete req.session.email;
    }
    res.redirect('/');
});

module.exports = router;
