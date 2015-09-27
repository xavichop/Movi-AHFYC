process.env.PORT=3001;
var routes = require('./routes/index');
var users = require('./routes/users');
var path = require('path');
var express = require('express');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/MoviDB');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var io =require('socket.io').listen(app);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/angular-socket', express.static(__dirname + '/node_modules/angular-socket-io/'));
app.use('/css', express.static(__dirname + '/css'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);



app.get('/login', function(req,res){
    res.sendfile(__dirname + '/public/Views/index.html');
});

app.set('view engine', 'jade');
//app.configure('development', function () { app.locals.pretty = true; });



app.get('/getUsers', function(req,res){
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});
/// error handlers

/*

 /// catch 404 and forwarding to error handler
 app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });
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
*/



module.exports = app;

