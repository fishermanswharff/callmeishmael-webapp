'use strict';
angular.module('MainDirective').directive('cmiVenueShowDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    scope: '=',
    templateUrl: 'views/venue-show-dashboard.html',
    controller: 'VenueController',
    controllerAs: 'venueController',
    bindToController: true,
    link: function($scope,element,attrs){
      var buttonStoryInput = element.find('input');
      buttonStoryInput.on('focus',function(){
        trace('focusing on input');
      });
    }
  };
}]);