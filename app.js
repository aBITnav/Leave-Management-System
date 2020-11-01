var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var login = require('./routes/login');
var users = require('./routes/users');
var employeeHome = require('./routes/employeeHome');
var managerHome = require('./routes/managerHome');
var logout = require('./routes/logout');

var createEmployee = require('./routes/createEmployee');
var createManager = require('./routes/createManager');

var configDB = require('./config/database.js');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// configuration

console.log("Connecting TO database");
mongoose.connect(configDB.url);
console.log("connection to database successful");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'olhosvermelhoseasenhaclassica',saveUninitialized:true,resave:true ,maxAge:null })); //session secret

app.use('/', login);
app.use('/users', users);
app.use('/employeeHome', employeeHome);
app.use('/createEmployee', createEmployee);
app.use('/createManager', createManager);
app.use('/managerHome', managerHome);
app.use('/logout',logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
