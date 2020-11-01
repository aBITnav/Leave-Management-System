var express = require('express');
var router = express.Router();
var api = require('../api/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    return api.loadManager().then(function(managers, err){
        // load all the managers, to show in the dropdown
        var arr = [];
        managers.forEach(function(manager){
            arr.push(manager.mngr_email);
        });

        res.render('createEmployee',{obj : arr});
    })

});

router.post('/', function(req, res, next) {
    var body = req.body;
    // create new employee
    return api.postEmployee(body).then(function(result){
        if(result)
        {
            console.log("Created Employee");
            res.redirect('/');
        }
        else {
            console.log("Failed creation of employee");
            res.json("Already exists");
        }
    });
});

module.exports = router;
