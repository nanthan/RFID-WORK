angular.module("myApp", ['btford.socket-io']) //load module
.factory('socketIO', function(socketFactory){
	return socketFactory({
		ioSocket: io.connect("http://localhost:3000/")
	});
})
.controller('mainCtrl', function($scope, $http, socketIO){
	$scope.Employees = [];
	$scope.employeeInstance = {};
	$scope.number = 5;
	refreshEmployees();

	function refreshEmployees(){
		$http.get('/api/employee').success(function(data){
			$scope.employees = data;
		});
	}

	$scope.save = function(){
		if($scope.employeeInstance.fname != null && $scope.employeeInstance.lname != null && $scope.employeeInstance.card != null){
			$http.post('/api/employee', $scope.employeeInstance).success(function(data){
			$scope.employees.push(data);
			$scope.employeeInstance = {};
			});	
		}
	}

	$scope.cal = function(){
		var sum = 0;
		angular.forEach(employees, function(index) {
			sum += index;
		});
	}

	socketIO.on('employee:refresh', function(){
		refreshEmployees();
	});
})