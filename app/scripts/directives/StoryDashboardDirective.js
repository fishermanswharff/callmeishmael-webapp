'use strict';
angular.module('MainDirective').directive('cmiStoryDashboard',['trace',function(trace){
  return {
    restrict: 'E',
    templateUrl: 'views/story-dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardController',
    bindToController: true,
    link: function($scope,element,attrs){
      var typeSelect = angular.element.find('#storyStatusSelect')[0],
          venueSelect = angular.element.find('#storyVenueField')[0];

      $(typeSelect).on('change',function(){
        if(this.value === 'Venue') {
          $(venueSelect).addClass('show');
        } else {
          $(venueSelect).removeClass('show');
        }
      });


    }
  };
}]);