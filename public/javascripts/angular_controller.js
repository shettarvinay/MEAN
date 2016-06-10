var myApp = angular.module('myApp',[]);

myApp.controller('blogs_controller',function($scope,$http){
	$scope.search='';
	$scope.sortOrder='false';
	// $scope.blogs=[1,2,3,4,5,6,7,8]

	$http.get('/blogs/blogs_json').then(function(response) {
		// console.log(response.data.blogs)
        $scope.blogs = response.data.blogs;
    });

});