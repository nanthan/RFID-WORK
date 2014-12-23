angular.module("myIns", ['btford.socket-io']) //load module
.factory('socketIO', function(socketFactory){
	return socketFactory({
		ioSocket: io.connect("http://localhost:3000/")
	});
})
.controller('mainCtrl', function($scope, $http, socketIO){
	$scope.fname;
	$scope.lname;
	$scope.position;
	$scope.arrived;


	function refreshCheck_in(){
		$http.get('/api/check-in').success(function(data){
			//$scope.logs = data;
			//console.log(data);
			$scope.fname = data.data[0].fname;
			$scope.lname = data.data[0].lname;
			$scope.position = data.data[0].position;
			$scope.arrived = data.ins[0].time +" | "+ data.ins.date;
		})
	}

	socketIO.on('check-in:refresh', function(){
		refreshCheck_in();
	});

})