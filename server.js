var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server listening at http://%s:%s", host, port);
});

//app.use(express.static(path.join(__dirname, './views')));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './dist/')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var routes = require('./routes/index');
app.use('/', routes);


mongoose.connect('mongodb://localhost:27017/parks');
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error: '));
db.once('open', function() {
	console.log('connected! ' + db.host, db.port, db.name);
});



app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});


app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});


module.exports = app;