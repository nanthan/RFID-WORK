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
			$scope.employees = [];
			data.forEach(function(emp) {
				$scope.employees.push({
					_id: emp.data._id,
					fname: emp.data.fname,
					lname: emp.data.lname,
					position: emp.data.position,
			        card: emp.data.card,
			        time: emp.log ? emp.log.time : null
				});
			});
		});
	}

	$scope.save = function(){
		if($scope.employeeInstance.fname != null && $scope.employeeInstance.lname != null && $scope.employeeInstance.card != null && $scope.employeeInstance.position != null){
			$http.post('/api/employee', $scope.employeeInstance).success(function(data){
			$scope.employees.push(data);
			$scope.employeeInstance = {};
			});	
		}
	}

	socketIO.on('employee:refresh', function(){
		refreshEmployees();
	});
})