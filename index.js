var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require(socket.io).(http);
var db = mongojs('my_server', ['book']);


app.use(express.static(__dirname + '/public'));

app.get('/api/book', function(req, res){
	db.book.find({}, function(err, docs){
	res.send(docs);	
	});
});

app.post('/api/book', function(req, res){
	//insert new book
	db.book.insert(req.body, function(err, docs){
		res.send(docs);
	});
});

io.on('connention', function(socket){
	console.log('a user connected');
})

var server = http.listen(3000, function () {
  console.log("server is running now")
})