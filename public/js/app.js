angular.module("myApp", [])
.controller('mainCtrl', function($scope, $http){
	$scope.books = [];
	$http.get('/api/book').success(function(data){
		$scope.books = data;
	})
})