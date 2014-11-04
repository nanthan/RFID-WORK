var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'));

app.get('/api/book', function(req, res){
	var books = [
		{title: 'Angular', price: 800},
		{title: 'NodeJS', price: 950},
		{title: 'Bootstrap', price: 600},
		{title: 'MongoDB', price: 670}
	];
	res.send(books);
});

var server = app.listen(3200, function () {
  console.log("server is running now")
})