'use strict';
angular.module('MainDirective').directive('cmiDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/admin-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){
      // trace($scope,element,attrs,'hello from dashboard directive');
    }
  };
}]);