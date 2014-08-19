var main = angular.module('Main', ['HtmlSegment', 'ngRoute']);

main.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/login', {templateUrl: 'html/login.html'}).
      otherwise({redirectTo: '/'});
}]);




