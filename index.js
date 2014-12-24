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
var ins;
var container = [];
var pack = [];
//var cal = require('app/cal');
//console.log(cal.add(2,3));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//for employee_list page
app.get('/api/employee', function(req, res){
	db_emp.emp_list.count(function(err, empCount) {
		pack = [];
		db_emp.emp_list.find({}, function(err, docs){
			
		 	docs.forEach (function (e){
		     	db_log.emp_log.find(({card: e.card})).sort({_id: -1 }).limit(1, function(err, data){
		 			pack.push({data: e, log: (data != null ? data[0] : null)});
		 			empCount--;
		 			if (empCount == 0) {
				 		res.send(pack);
				 		return;
				 	}
				});
		 	});
				
		});
	});
});

//for admin page
app.post('/api/employee', function(req, res){
	//insert new employee
	db_emp.emp_list.insert(req.body, function(err, docs){
		res.send(docs);
		io.emit("employee:refresh");
	});
});

//for login page
app.get('/api/admin', function(req, res){
	db_admin.admin_list.find({}, function(err, docs){
		res.send(docs);
	});
});


app.post('/api/check-in',function(req,res){
	now = new Date();
	date = dateFormat(now, "dd-mm-yyyy");
	time = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	//console.log(date);
	ins = { 
				card: req.body.card,
				date: date,
				time: time 
				}
	//tmp = req.body;
	db_log.emp_log.insert((ins),function(err,data){
		console.log(data);
		res.send(data);	
		io.emit("check-in:refresh");
		io.emit("employee:refresh");
	});
});

app.get('/api/check-in',function(req,res){
	//console.log(ins.card);
	db_emp.emp_list.find(({card: ins.card}),function(err,data){
	 	//console.log(data);
	 	container = {ins:ins,
	 				data:data[0]
	 				}

	 	res.send(container);
	});
})


io.on('connection', function(socket){
	console.log("a user connected");
})

http.listen(3000, function () {
  console.log("server is running now")
})