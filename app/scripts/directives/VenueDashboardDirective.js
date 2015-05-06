'use strict';
angular.module('MainDirective').directive('cmiVenueDashboard',['VenueFactory','trace',function(VenueFactory,trace){
  return {
    restrict: 'E',
    templateUrl: 'views/venue-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){}
  };
}]);