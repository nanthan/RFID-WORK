angular.module("myIns", ['btford.socket-io']) //load module
.factory('socketIO', function(socketFactory){
	return socketFactory({
		ioSocket: io.connect("http://localhost:3000/")
	});
})
.controller('mainCtrl', function($scope, $http, socketIO){
	$scope.fname = "Test1";
	$scope.lname = "Test2";
	$scope.position = "Test3";
	$scope.arrived = "Test4";

	function refreshCheck_in(){
		$http.get('/api/check-in').success(function(data){
			$scope.logs = data;
			console.log(data);
		})
	}

	socketIO.on('check-in:refresh', function(){
		refreshCheck_in();
	});

})