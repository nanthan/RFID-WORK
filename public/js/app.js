angular.module("myApp", ['btford.socket-io']) //load module
.factory('socketIO', function(socketFactory){
	return socketFactory({
		ioSocket: io.connect("http://localhost:3000")
	});
})
.controller('mainCtrl', function($scope, $http, socketIO){
	$scope.books = [];
	$scope.bookInstance = {};
	$scope.number = 5;
	refreshBooks();

	function refreshBooks(){
		$http.get('/api/book').success(function(data){
			$scope.books = data;
		});
	}

	$scope.save = function(){
		$http.post('/api/book', $scope.bookInstance).success(function(data){
			$scope.books.push(data);
			$scope.bookInstance = {};
		});
	}

	$scope.cal = function(){
		var sum = 0;
		angular.forEach(books, function(index) {
			sum += index;
		});
	}

	socketIO.on('book:refresh', function(){
		refreshBooks();
	});
})