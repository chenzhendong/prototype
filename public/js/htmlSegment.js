var htmlSegment = angular.module('htmlSegment', []);

htmlSegment.directive('headNavBar', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/headNavBar.html'
    };
});

htmlSegment.directive('footNavBar', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/footNavBar.html'
    };
});


htmlSegment.directive('login', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/login.html'
    };
});
