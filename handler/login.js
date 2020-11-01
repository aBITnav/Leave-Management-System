/**
 * Created by bhalker on 25/10/16.
 */

(function(){


    var mongoose = require('mongoose');
    var employeeSchema = require('../config/schema').employee;
    var managerSchema = require('../config/schema').manager;
    mongoose.Promise = require('bluebird');
    var api = require('../api/api');


    var handler = {};

    handler.handle = function(req, res) {
        var self = this;
        var body = req.body;
        return api.loadEmployee(body.email, body.password).then(function(employee) {
            if (employee) {
                req.session.email = employee.emp_email;
                res.redirect('employeeHome');
            }
            else {
                return api.loadManager(body.email, body.password).then(function (manager) {
                    if (manager) {
                        req.session.email = manager.mngr_email;
                        res.redirect('managerHome');
                    }
                    else {
                        res.json("Invalid username or password");
                    }
                });
            }
        });
    };

    /*handler.searchEmployee = function(req, res){
        var Model = mongoose.model('test1', employeeSchema);
        var email = req.body.email,
            password = req.body.password;
        var promise = Model.findOne({
            $and :[
                {'emp_email': email},
                {'password':password}
            ]}).exec();

        return promise.then(function(employee, err){
            if(employee){
                console.log("LogIn - Employee found");
                req.session.email = employee.emp_email;
                return true;
            }
            else{
                //res.json("Employee doesn't exist");
                return false;
            }
        })
    };

    handler.searchManager = function(req, res){
        var Model = mongoose.model('test2', managerSchema);
        var email = req.body.email,
            password = req.body.password;
        var promise = Model.findOne({
            $and :[
                {'mngr_email': email},
                {'password':password}
            ]}).exec();

        return promise.then(function(employee, err){
            if(employee){
                console.log("LogIn - Manager found");
                req.session.email = employee.mngr_email;
                return true;
            }
            else
                return false;
        })
    };*/


    module.exports = handler;
})();
