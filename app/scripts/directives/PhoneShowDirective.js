'use strict';
angular.module('MainDirective').directive('cmiPhoneShowDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    scope: '=',
    templateUrl: 'views/phone-show-dashboard.html',
    controller: 'VenueController',
    controllerAs: 'venueController',
    bindToController: true,
    link: function($scope,element,attrs){
      // trace($scope);
    }
  };
}]);