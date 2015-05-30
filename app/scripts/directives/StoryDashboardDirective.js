'use strict';
angular.module('MainDirective').directive('cmiStoryDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/story-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    scope: '=',
    link: function($scope,element,attrs){}
  };
}]);