var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = mongojs('my_server', ['book']);
var cal = require('app/cal');
console.log(cal.add(2,3));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/book', function(req, res){
	db.book.find({}, function(err, docs){
		res.send(docs);	
	});
});

app.post('/api/book', function(req, res){
	//insert new book
	db.book.insert(req.body, function(err, docs){
		res.send(docs);
		io.emit("book:refresh");
	});
});

io.on('connection', function(socket){
	console.log("a user connected");
})

http.listen(3000, function () {
  console.log("server is running now")
})