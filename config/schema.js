
(function(){
    /*
     This holds all the schema required
     */

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var employee = new Schema({
        "emp_name": String,
        "emp_email": String,
        "emp_id": String,
        "password": String,
        "emp_managerEmail": String,
        "emp_leaves": [
            {
                "leaveId": String,
                "startDate": String,
                "endDate": String,
                "status": String,
                "reason": String

            }]
    }, {collection: 'employee'});

    var manager = new Schema({
        "mngr_name" : String,
        "mngr_email": String,
        "password" : String,
        "mngr_id" : String,
        "reportingEmployees" : [],
        "leaveAppliedEmployees" : [{
            "emp_id" : Number,
            leaves : []
        }]
    }, {collection: 'manager'});



    module.exports.employee =  employee;
    module.exports.manager = manager;

})();