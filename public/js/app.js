angular.module("myApp", [btford.socket-io]) //load module
.factory('socketIO', function(socketFactory){
	return socketFactory({
		ioSocket: io.connect("http://localhost:3000");
	})
})
.controller('mainCtrl', function($scope, $http, socketIO){
	$scope.books = [];
	$http.get('/api/book').success(function(data){
		$scope.books = data;
	})

	$scope.save = function(){
		$http.post('/api/book', $scope.bookInstance).success(){}
	}
})