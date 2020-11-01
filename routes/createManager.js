var express = require('express');
var router = express.Router();
var api = require('../api/api');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('createManager',{});
});

router.post('/', function(req, res, next){
    var body = req.body;
    // create new manager
    return api.postManager(body).then(function(result){
        if(result)
        {
            console.log("Created Manager");
            res.redirect('/');
        }
        else {
            console.log("Failed creation of Manager");
            res.json("Already exists... Try Again");
        }
    })
});

module.exports = router;
