var myApp = angular.module('myApp',[]);

myApp.controller('blogs_controller',function($scope,$http){
	$scope.search='';
	$scope.sortOrder='false';
	$http.get('/blogs/blogs_json').then(function(response) {
        $scope.blogs = response.data.blogs;
    });


    $scope.delete_blog=function(_id){
    	$http.post('/blogs/delete_blogs',{_id : _id}).then(function(response){
    		$("#blog_"+_id).remove();
    	});
    };

});

myApp.controller('stats_controller',function($scope,$http){
    $scope.sortOrder='false';
    $http.get('/blogs/get_stats_json').then(function(response) {
        $scope.stats = response.data.stats;
    });
});