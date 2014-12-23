var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db_emp = mongojs('employee', ['emp_list']);
var db_admin = mongojs('employee', ['admin_list']);
var db_log = mongojs('employee', ['emp_log']);
//var cal = require('app/cal');
//console.log(cal.add(2,3));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/employee', function(req, res){
	db_emp.emp_list.find({}, function(err, docs){
		res.send(docs);	
	});
});

app.post('/api/employee', function(req, res){
	//insert new employee
	db_emp.emp_list.insert(req.body, function(err, docs){
		res.send(docs);
		io.emit("employee:refresh");
	});
});

app.get('/api/admin', function(req, res){
	db_admin.admin_list.find({}, function(err, docs){
		res.send(docs);
	});
});

app.post('/api/check-in',function(req,res){
	now = new Date();
	date = dateFormat(now, "dd-mm-yyyy");
	time = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	console.log(date);
	ins = { 
				card: req.body.card,
				date: date,
				time: time 
				}
	db_log.emp_log.insert((ins),function(err,data){
		res.send(data);	
		io.emit("check-in:refresh");
		//io.emit("employee:refresh");
	});
});


app.get('/api/check-in',function(req,res){
	db_emp.emp_list.find({},function(err,logs){
		res.send(logs);
	});
})

io.on('connection', function(socket){
	console.log("a user connected");
})

http.listen(3000, function () {
  console.log("server is running now")
})