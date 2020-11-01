var express = require('express');
var router = express.Router();
var api = require('../api/api');
var uuid = require("uuid");
var Promise = require('bluebird');

router.get('/', function (req, res, next) {

    var renderingObj = [], managerName;
    if (req.session.email) {
        return api.loadManager(req.session.email).then(function (manager) {
            if (manager) {
                managerName = manager.mngr_name;
                var reportingEmployees = manager.reportingEmployees;
                var promiseArr = [];
                reportingEmployees.forEach(function (emp) {
                    var tinyPromise = api.loadEmployee(emp);
                    promiseArr.push(tinyPromise);
                });
                return Promise.all(promiseArr);
            }
        }).then(function (employeeArr) {
            employeeArr.forEach(function (emp) {

                emp.emp_leaves.forEach(function (leave) {
                    if (leave.status === 'pending') {
                        var obj = {};
                        obj.employeeName = emp.emp_name;
                        obj.employeeEmail = emp.emp_email;
                        obj.leaveId = leave.leaveId;
                        obj.startDate = leave.startDate;
                        obj.endDate = leave.endDate;
                        renderingObj.push(obj);
                    }
                })
            });
            res.render('managerHome', {name:managerName, obj: renderingObj});
        });
    }
    else {
        res.redirect('/');
    }


});

router.put('/', function (req, res, next) {
    var body = req.body;
    if (body.action) {
        api.loadEmployee(body.email).then(function (employee) {
            if (employee) {
                for (var i = 0; i < employee.emp_leaves.length; i++) {
                    var emp = employee.emp_leaves[i];
                    if (emp.leaveId === body.leaveId) {
                        emp.status = body.action;
                        emp.reason = body.rejectReason ? body.rejectReason : "";
                        var promise = employee.save();
                        return promise;
                    }
                }
            }
        }).then(function (employee, error) {
            if (employee) {
                console.log("Employee leave Approved/Rejected!!!");
                res.json("Success");
            }
            else {
                res.json("Error");
            }
        });
        console.log("HERE");
    }
});


module.exports = router;