var express = require('express');
var router = express.Router();
var api = require('../api/api');
var uuid = require("uuid");

router.get('/', function (req, res, next) {
    var employee = req.session.email;
    if (employee) {
        return api.loadEmployee(employee).then(function (employee) {
            if (employee) {
                console.log("Gotchsa");
                var leaves = employee.emp_leaves, context = {};

                res.render('employeeHome', {title: 'Leave Management System', name:employee.emp_name ,obj: employee.emp_leaves});
            }
        });
    }
    else {
        res.redirect('/');
    }

});


router.post('/', function (req, res, next) {
    var employee = req.session.email, promise;
    return api.loadEmployee(employee).then(function (employee) {
        if (employee) {

            console.log("Success :)");
            employee.emp_leaves.push(createLeaveObject(req));
            promise = employee.save();
            return promise;
        }
    }).then(function (employee) {
        console.log("leave applied successfull :) ");
        res.redirect('/employeeHome');
    });
});


var createLeaveObject = function (req) {
    var leaveObj = {}, body = req.body;
    leaveObj.leaveId = uuid.v4();
    leaveObj.startDate = body.startDate;
    leaveObj.endDate = body.endDate;
    leaveObj.status = "pending...";
    leaveObj.reason = "";
    return leaveObj;
};


module.exports = router;
