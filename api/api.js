(function(){

    var api = {};
    var mongoose = require('mongoose');
    var uuid = require("uuid");
    var employeeSchema = require('../config/schema').employee;
    var managerSchema = require('../config/schema').manager;;
    mongoose.Promise = require('bluebird');

    api.loadEmployee = function(email, password){
        var Model = mongoose.model('test', employeeSchema);
        var promise;
        if(email && password){
            promise = Model.findOne({
                $and :[
                    {'emp_email': email},
                    {'password':password}
                ]}).exec();

        }
        else if(email && !password){
            promise = Model.findOne({'emp_email': email}).exec();
        }

        return promise.then(function(employee, err){
            if(employee)
            return employee;

            if(err)
            res.json("Error while fetching employee from database");

            return false;
        })

    };

    api.loadManager = function(email, password){
        var Model = mongoose.model('test2', managerSchema);
        var promise;

        if(email && password){
            promise = Model.findOne({
                $and :[
                    {'mngr_email': email},
                    {'password':password}
                ]}).exec();

        }
        else if(email && !password){
            promise = Model.findOne({'mngr_email': email}).exec();
        }
        else if(!email && !password){
            promise = Model.find().exec();
        }

        return promise.then(function(employee, err){
            if(employee)
                return employee;

            if(err)
                res.json("Error while fetching manager from database");

            return false;
        })
    };




    api.postManager = function(body){
        //  Create Manager
        var Model = mongoose.model('test4', managerSchema), promise;

        return this.loadManager(body.email, body.password)
            .then(function(isManagerExists){
                if(isManagerExists){
                    return false;
                }

                var manager = new Model({
                    "mngr_name" : body.name,
                    "mngr_id" : uuid.v4(),
                    "mngr_email": body.email,
                    "password" : body.password,
                    "reportingEmployees" : [],
                    "leaveAppliedEmployees" : []
                });

                return promise = manager.save();

            }).then(function(result ,err){
                if(result)
                return true;
                return false;
            })

    };

    api.postEmployee = function(body){
        // create new employee

        var Model = mongoose.model('test5', employeeSchema), promise, self=this;

        return this.loadEmployee(body.email).then(function(isEmployeeExists){
            if(isEmployeeExists)
                return false;

            var employee = new Model({
                "emp_name": body.name,
                "emp_email": body.email,
                "emp_id": uuid.v4(),
                "password": body.password,
                "emp_managerEmail": body.managerEmail,
                "emp_leaves": []
            });
            return promise = employee.save();

        }).then(function(result ,err){
            if(result){
                return self.updateManagerReporters(result);
            }
            return false;
        }).then(function(result){
            return result;
        });

    };


    api.updateManagerReporters = function(employee){
        var managerEmailId =  employee.emp_managerEmail;

        return this.loadManager(managerEmailId).then(function(manager){
            if(manager){
                manager.reportingEmployees.push(employee.emp_email);
                return manager.save();
            }
        }).then(function(manager, error){
            if(manager)
                return true;
            if(error){
                console.log("Error while adding reporting employees, under manager");
                throw new Error("Error while adding reporting employees, under manager");
            }
            return false;
        })

    };

    module.exports = api;

})();