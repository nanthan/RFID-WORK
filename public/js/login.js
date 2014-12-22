angular.module('myLogin', ['angular-md5'])
    .controller('mainCtrl', function($scope, $http, md5) {
    	$scope.$watch('password' ,function() {
        	$scope.message = 'Hash : ' + md5.createHash($scope.password || '');
    	});

    	$scope.admin = [];

    	$scope.login = function(){
    		var log;
    		$scope.ins = [];
			$http.get('/api/admin').success(function(data){
				for (x in data){
				    if(data[x].user === $scope.username){
				    	if(data[x].password === md5.createHash($scope.password || '')){
							console.log("Yes !!");	
							window.location="admin.html";
						}
						else{
							console.log("Incorrect password");
						}
				    }
				}
				console.log("User not found");
			});
		}

   });