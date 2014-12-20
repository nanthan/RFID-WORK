var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = mongojs('employee', ['personal']);
//var cal = require('app/cal');
//console.log(cal.add(2,3));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/employee', function(req, res){
	db.personal.find({}, function(err, docs){
		res.send(docs);	
	});
});

app.post('/api/employee', function(req, res){
	//insert new employee
	db.personal.insert(req.body, function(err, docs){
		res.send(docs);
		io.emit("employee:refresh");
	});
});

io.on('connection', function(socket){
	console.log("a user connected");
})

http.listen(3000, function () {
  console.log("server is running now")
})