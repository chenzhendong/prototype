var htmlSegment = angular.module('HtmlSegment', []);

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
