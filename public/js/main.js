'use strict';

var app = angular.module('main', ['ngRoute', 'htmlSegment']);

app.controller('RootCtrl', ['$scope', function($scope){
    $scope.title = "Home Page";
}]);

app.controller('CatsCtrl', ['$scope', function($scope){
    $scope.title = "Cats Page";
}]);

app.config(['$routeProvider', function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when('/', {
            controller: 'RootCtrl',
            templateUrl: 'html/login.html'
        })
        .otherwise({
            redirectTo : '/'
        });
}]);




