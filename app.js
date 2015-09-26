process.env.PORT=3001
var routes = require('./routes/index');
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var io =require('socket.io').listen(app);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/angular-socket', express.static(__dirname + '/node_modules/angular-socket-io/'));
app.use('/css', express.static(__dirname + '/node_modules/angular-socket-io/'));
app.use('/css', express.static(__dirname + '/css'));

app.use('/', routes);

app.set('view engine', 'jade');
//app.configure('development', function () { app.locals.pretty = true; });

module.exports = app;
