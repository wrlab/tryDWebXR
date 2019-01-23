var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');


var apphttp = express();

// apphttp.use(function(req, res, next) {
//
//         res.redirect('https://dwxr.vm.wrl.onl:3001');
//
// });



apphttp.use(logger('dev'));
apphttp.use(express.json());
apphttp.use(express.urlencoded({ extended: false }));
apphttp.use(cookieParser());
apphttp.use(express.static(path.join(__dirname, 'public')));

apphttp.use('/', indexRouter);



module.exports = apphttp;
